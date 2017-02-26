import {BaseCommands} from "../uv-shared-module/BaseCommands";
import {RightPanel} from "../uv-shared-module/RightPanel";

export class MoreInfoRightPanel extends RightPanel {

    component: IIIFComponents.IMetadataComponent;
    $metadata: JQuery;
    limitType: IIIFComponents.MetadataComponentOptions.LimitType;
    limit: number;

    constructor($element: JQuery) {
        super($element);
    }

    create(): void {

        this.setConfig('moreInfoRightPanel');

        super.create();
        
        $.subscribe(BaseCommands.CANVAS_INDEX_CHANGED, () => {
            this.databind();
        });

        this.setTitle(this.config.content.title);

        this.$metadata = $('<div class="iiif-metadata-component"></div>');
        this.$main.append(this.$metadata);

        this.component = new IIIFComponents.MetadataComponent({
            target: this.$metadata[0],
            data: this._getData()
        });
    }

    toggleFinish(): void {
        super.toggleFinish();
        this.databind();
    }

    databind(): void {
        this.component.options.data = this._getData();
        this.component.set(new Object()); // todo: should be passing data
    }

    private _getData(): IIIFComponents.IMetadataComponentData {
        return <IIIFComponents.IMetadataComponentData>{
            canvasDisplayOrder: this.config.options.canvasDisplayOrder,
            canvases: this.extension.getCurrentCanvases(),
            canvasExclude: this.config.options.canvasExclude,
            canvasLabels: this.extension.getCanvasLabels(this.content.page),
            content: this.config.content,
            copiedMessageDuration: 2000,
            copyToClipboardEnabled: Utils.Bools.getBool(this.config.options.copyToClipboardEnabled, false),
            helper: this.extension.helper,
            licenseFormatter: null,
            limit: this.config.options.textLimit || 4,
            limitType: IIIFComponents.MetadataComponentOptions.LimitType.LINES,
            manifestDisplayOrder: this.config.options.manifestDisplayOrder,
            manifestExclude: this.config.options.manifestExclude,
            range: this.extension.getCurrentCanvasRange(),
            rtlLanguageCodes: this.config.options.rtlLanguageCodes,
            sanitizer: (html) => {
                return this.extension.sanitize(html);
            },
            showAllLanguages: this.config.options.showAllLanguages
        };
    }

    resize(): void {
        super.resize();

        this.$main.height(this.$element.height() - this.$top.height() - this.$main.verticalMargins());
    }
}