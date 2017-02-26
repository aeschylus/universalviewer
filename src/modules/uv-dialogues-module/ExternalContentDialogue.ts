import {BaseCommands} from "../uv-shared-module/BaseCommands";
import {Dialogue} from "../uv-shared-module/Dialogue";

export class ExternalContentDialogue extends Dialogue {

    $iframe: JQuery;

    constructor($element: JQuery) {
        super($element);
    }

    create(): void {

        this.setConfig('externalContentDialogue');

        super.create();

        this.openCommand = BaseCommands.SHOW_EXTERNALCONTENT_DIALOGUE;
        this.closeCommand = BaseCommands.HIDE_EXTERNALCONTENT_DIALOGUE;

        $.subscribe(this.openCommand, (e: any, params: any) => {
            this.open();
            this.$iframe.prop('src', params.uri);
        });

        $.subscribe(this.closeCommand, () => {
            this.close();
        });

        this.$iframe = $('<iframe></iframe>');
        this.$content.append(this.$iframe);

        this.$element.hide();
    }

    resize(): void {
        super.resize();

        this.$iframe.width(this.$content.width());
        this.$iframe.height(this.$content.height());
    }
}