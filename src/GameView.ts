class GameView extends egret.Sprite
{

    private number_boxes: Array<Array<number>>;
    private number_bits: Array<Array<egret.TextField>>;
    private playground: egret.Sprite;
    private game_level: GameLevel;
    private target_field: egret.Sprite;
     private cur_field: egret.Sprite;
    private level_field: egret.Sprite;
    private score_field: egret.Sprite;
    
    private tagert_text_field: egret.TextField;
    private cur_text_field: egret.TextField;
    private level_text_field: egret.TextField;
    private score_text_field: egret.TextField;
   
    
    private target_num: number = 0;
    
    public constructor(x: number, y: number, width: number, height: number)
    {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.init();
    }
    
   

    private updateNumbers(col: number) 
    {
        this.number_boxes = [];
        this.number_bits = [];
        for(var i: number = 0;i < col; i ++)
        {
            var tmp: Array<number> = []
            var bit_tmp: Array<egret.TextField> = [];
            for(var j: number = 0;j < col; j++) {
                var num: number = Math.floor(Math.random() * 2);
                tmp.push(num);
                var label:egret.TextField = new egret.TextField(); 
                label.text = num.toString();
                label.background = true;
                label.backgroundColor = 0xFF9999;
                bit_tmp.push(label);
            }
            this.number_boxes.push(tmp);
            this.number_bits.push(bit_tmp);
        }
        console.log(this.number_boxes[0]);
    }

    private scoreText:egret.BitmapText;

    private init():void
    {   
        this.game_level = new GameLevel();
        this.init_level_ground();
        // this.init_cur_ground();
        this.init_playground();
        var level: number = 1;
        var sub_level: number = 1;
        this.updateNumbers(this.game_level.box_num);
        this.init_paly_pannel(this.game_level.box_num);
        this.startgame();
    }
    
    private init_level_ground(){
        var width = this.width * 0.9;
        var x = (this.width - width)/2;
        var y = this.height * 0.01;
        var level_ground = new egret.Sprite();
        level_ground.x = x;
        level_ground.y = y;
        level_ground.width = width;
        level_ground.height = this.height * 0,2;
        level_ground.graphics.beginFill(0xFFCC99);
        level_ground.graphics.drawRoundRect(0, 0, width, width, 10, 10);
        level_ground.graphics.endFill();
        this.target_field = new egret.Sprite();
        this.target_field.x = 5;
        this.target_field.y = 5;
        this.target_field.width = (width - 10) / 3;
        this.target_field.height = (width - 10) / 3;
        this.target_field.graphics.beginFill(0x6699FF);
        this.target_field.graphics.drawRoundRect(0, 0, this.target_field.width, this.target_field.width, 10, 10);
        this.target_field.graphics.endFill();
        var target_label = new egret.TextField();
        target_label.text = "Target:";
        target_label.fontFamily = "SimHei";
        target_label.textColor = 0xCC0000;
        target_label.size = target_label.size;
        target_label.width = this.target_field.width;
        target_label.height = this.target_field.height /4;
        target_label.bold = true;
        target_label.stroke = 3;
        target_label.x = 10;
        target_label.y = 5;
        this.target_field.addChild(target_label);
        this.tagert_text_field = new egret.TextField();
        this.tagert_text_field.text = this.target_num.toString();
        this.tagert_text_field.width = this.target_field.width;
        this.tagert_text_field.y = this.target_field.width * 0.3 
        this.tagert_text_field.height = this.target_field.height * 0.7;
        this.tagert_text_field.size = this.target_field.width * 0.7;
        this.tagert_text_field.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.tagert_text_field.textAlign = egret.HorizontalAlign.CENTER;
        this.tagert_text_field.bold = true;
        this.target_field.addChild(this.tagert_text_field);

        level_ground.addChild(this.target_field);
        this.addChild(level_ground);

        // ==================右上角当前点击值============================

        var cur_ground = new egret.Sprite();

        cur_ground.x = this.width * 0.9 - (width - 10) / 3;
        cur_ground.y = y;
        cur_ground.width = width;
        cur_ground.height = this.height * 0.2;
        this.cur_field = new egret.Sprite();
        this.cur_field.x = 5;
        this.cur_field.y = 5;
        this.cur_field.width = (width - 10) / 3;
        this.cur_field.height = (width - 10) / 3;
        this.cur_field.graphics.beginFill(0x6699FF);
        this.cur_field.graphics.drawRoundRect(0, 0, this.target_field.width, this.target_field.width, 10, 10);
        this.cur_field.graphics.endFill();
        var cur_label = new egret.TextField();
        cur_label.text = "Cur:";
        cur_label.fontFamily = "SimHei";
        cur_label.textColor = 0xCC0000;
        cur_label.size = cur_label.size;
        cur_label.width = this.target_field.width;
        cur_label.height = this.target_field.height /4;
        cur_label.bold = true;
        cur_label.stroke = 3;
        cur_label.x = 10;
        cur_label.y = 5;
        this.cur_field.addChild(cur_label);
        this.cur_text_field = new egret.TextField();
        this.cur_text_field.text = this.target_num.toString();
        this.cur_text_field.width = this.target_field.width;
        this.cur_text_field.y = this.target_field.width * 0.3 
        this.cur_text_field.height = this.target_field.height * 0.7;
        this.cur_text_field.size = this.target_field.width * 0.7;
        this.cur_text_field.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.cur_text_field.textAlign = egret.HorizontalAlign.CENTER;
        this.cur_text_field.bold = true;
        this.cur_field.addChild(this.cur_text_field);
       
        cur_ground.addChild(this.cur_field);
        this.addChild(cur_ground);
    }


    // private init_cur_ground(){

    //     var cur_ground = new egret.Sprite();
    //     cur_ground.x = x;
    //     cur_ground.y = y;
    //     cur_ground.width = width;
    //     cur_ground.height = this.height * 0,2;
    //     cur_ground.graphics.beginFill(0xFFCC99);
    //     cur_ground.graphics.drawRoundRect(0, 0, width, width, 10, 10);
    //     cur_ground.graphics.endFill();
    //     this.cur_field = new egret.Sprite();
    //     this.cur_field.x = 5;
    //     this.cur_field.y = 5;
    //     this.cur_field.width = (width - 10) / 3;
    //     this.cur_field.height = (width - 10) / 3;
    //     this.cur_field.graphics.beginFill(0x6699FF);
    //     this.cur_field.graphics.drawRoundRect(0, 0, this.target_field.width, this.target_field.width, 10, 10);
    //     this.cur_field.graphics.endFill();
    //     var cur_label = new egret.TextField();
    //     cur_label.text = "Cur:";
    //     cur_label.fontFamily = "SimHei";
    //     cur_label.textColor = 0xCC0000;
    //     cur_label.size = cur_label.size;
    //     cur_label.width = this.target_field.width;
    //     cur_label.height = this.target_field.height /4;
    //     cur_label.bold = true;
    //     cur_label.stroke = 3;
    //     cur_label.x = 10;
    //     cur_label.y = 5;
    //     this.target_field.addChild(cur_label);
    //     this.cur_text_field = new egret.TextField();
    //     this.cur_text_field.text = this.target_num.toString();
    //     this.cur_text_field.width = this.target_field.width;
    //     this.cur_text_field.y = this.target_field.width * 0.3 
    //     this.cur_text_field.height = this.target_field.height * 0.7;
    //     this.cur_text_field.size = this.target_field.width * 0.7;
    //     this.cur_text_field.verticalAlign = egret.VerticalAlign.MIDDLE;
    //     this.cur_text_field.textAlign = egret.HorizontalAlign.CENTER;
    //     this.cur_text_field.bold = true;
    //     this.cur_field.addChild(this.cur_text_field);
       
    //     cur_ground.addChild(this.cur_field);
    //     this.addChild(cur_ground);
    // }

    private init_playground(): void {
        var width = this.width * 0.9;
        var x = (this.width - width)/2;
        var y = this.height * 0.3;
        this.playground = new egret.Sprite();
        this.playground.x = x;
        this.playground.y = y;
        this.playground.width = width;
        this.playground.height = width;
        this.playground.graphics.beginFill(0xFFCC99);
        this.playground.graphics.drawRoundRect(0, 0, width, width, 10, 10);
        this.playground.graphics.endFill();
        this.addChild(this.playground);
    }
    
    private init_paly_pannel(len): void
    {   
        var col: number = 5; //间隔
        var l_width = (this.playground.width - col * (len + 1)) / len;
        
        var x: number = 5;
        var y: number = 5;
            
        for(var i: number = 0;i < len;i++)
        {   
            for(var j: number = 0;j < len;j++) 
            {
                var label: egret.TextField = this.number_bits[i][j];
                label.x = x;
                label.y = y;
                label.width = l_width;
                label.height = l_width;
                label.verticalAlign = egret.VerticalAlign.MIDDLE;
                label.textAlign = egret.HorizontalAlign.CENTER;
                label.fontFamily = "SimHei";
                label.size = 80;
                label.bold = true;
                label.textColor = 0x646464;
                this.playground.addChild(label);
                x = x + l_width + 5;
            }
            x = 5;
            y = y + l_width + 5;
        }
        
    }
    
    public startgame():void
    {
//        this.playground.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.playgroundOntuchMove, this.playground);
        this.playground.touchEnabled = true;
        this.playground.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchNearBoxes, this);
        this.playground.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchNearBoxes, this);
        this.playground.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEndNearBoxes, this);
        this.playground.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEndNearBoxes, this);
        console.log("点击监听设置结束");
    }

//    private gameOver(evt:GameEvent=null):void
//    {
//        var event:GameEvent = new GameEvent(GameEvent.GAME_OVER);
//        this.dispatchEvent(event);
//    }


    private getNears(event):Array<Array<number>> {
        
        var x:number = event.localX;
        var y:number = event.localY;
        if(x < 0 || y < 0) { 
            return Array<Array<number>>();
        }
        var pre_witdh = this.playground.width / this.game_level.box_num;
        var i: number = Math.floor( x / pre_witdh);
        var j: number = Math.floor( y / pre_witdh);
                
                
        var nears = Array<Array<number>>();
        nears.push([j,i]);
        if(i == 0) {
            nears.push([j,i + 1]); // 如果靠左边界，加右边一个
        } else if(i == this.game_level.box_num - 1) {
            nears.push([j,i - 1]); // 如果靠右边界，加左边一个
        } else { 
            var offset = (i + 1) * pre_witdh - x;
            if(offset < pre_witdh / 2) {
                nears.push([j,i + 1]);
            } else { 
                nears.push([j,i - 1]);
            }
        }
        if(j == 0) {
            nears.push([j + 1,i]); // 如果靠上边界，加下边一个
        } else if(j == this.game_level.box_num - 1) {
            nears.push([j - 1,i]); // 如果靠下边界，加上边一个
        } else { 
            var offset = (j + 1) * pre_witdh - y;
            if(offset < pre_witdh / 2) {
                nears.push([j +1,i]);
            } else { 
                nears.push([j -1,i]);
            }
        }
        //根据矩阵算出剩下的一个
        if(nears[0][0] + nears[0][1] == nears[1][0] + nears[1][1]) {
            nears.push([(nears[0][0] + nears[1][0]) - nears[2][0], (nears[0][1] + nears[1][1]) - nears[2][1]]);
        } else { 
            nears.push([(nears[1][0] + nears[2][0]) - nears[0][0], (nears[1][1] + nears[2][1]) - nears[0][1]]);
        }
        return nears;
    }
    
    
    private touchNearBoxes(event) {
        var nears = this.getNears(event);
        for(var i = 0;i < this.number_boxes.length; i ++ ){ 
            for(var j = 0;j < this.number_boxes[i].length;j++) { 
                this.number_bits[i][j].backgroundColor = 0xFF9999;
            }
        }
        
        for(var k = 0;k < nears.length; k ++ ){ 
            var m = nears[k][0];
            var n = nears[k][1];
            this.number_bits[m][n].backgroundColor = 0xFFFFFF;
        }
    }
    
    private touchEndNearBoxes(event) {
        var nears = this.getNears(event);
        if(nears.length == 0) { 
            for(var i = 0;i < this.number_boxes.length; i ++ ){ 
                for(var j = 0;j < this.number_boxes[i].length;j++) { 
                    this.number_bits[i][j].backgroundColor = 0xFF9999;
                }
            }
            return;
        }
        console.log(nears.toString());
        var sum = 0;
        for(var k = 0;k < nears.length; k ++ ){ 
            var m = nears[k][0];
            var n = nears[k][1];
            var cur = this.number_boxes[m][n];
            sum = cur + sum;
            this.number_bits[m][n].backgroundColor = 0xFF9999;
        }
        console.log(sum);
        this.cur_text_field.text = sum.toString();
    }
}