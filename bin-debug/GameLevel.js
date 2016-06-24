/**
 *
 * @author liurz
 *
 */
var GameLevel = (function () {
    function GameLevel() {
        this.level = 1;
        this.sub_level = 1;
        this.box_num = 4;
        this.target_boxes_num = 4;
        this.max_number = 2;
    }
    var d = __define,c=GameLevel;p=c.prototype;
    p.pass_level = function () {
        if (this.sub_level == this.level) {
            this.level = this.level + 1;
            this.sub_level = 1;
        }
        else {
            this.sub_level = this.sub_level + 1;
        }
    };
    return GameLevel;
})();
egret.registerClass(GameLevel,"GameLevel");
