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
    private timeBar:egret.Sprite;

    private timer:egret.Timer
    private timePassed: number = 0;
    private score = 0;

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
                var num: number = this.getRandom(0, this.game_level.max_number);
                tmp.push(num);
                var label:egret.TextField = new egret.TextField(); 
                label.text = num.toString();
                label.background = true;
                //数字方块背景颜色
                label.backgroundColor = 0xa7bfbf;
                bit_tmp.push(label);
            }
            this.number_boxes.push(tmp);
            this.number_bits.push(bit_tmp);
        }
    }

    private getRandom(min: number, max: number){
        var r = Math.random() * (max - min);
        var re = Math.round(r + min);
        re = Math.max(Math.min(re, max), min)     
        return re;
    }

    private get_target_num():void{
        var x = this.getRandom(1, this.playground.width - 1);
        var y = this.getRandom(1, this.playground.width - 1);
        var target_boxes = this.get_nears_from_xy(x, y);
        var sum = 0;
        for(var k = 0;k < target_boxes.length; k ++ ){ 
            var m = target_boxes[k][0];
            var n = target_boxes[k][1];
            var cur = this.number_boxes[m][n];
            sum = cur + sum;
        }
        this.target_num = sum
        this.tagert_text_field.text = this.target_num.toString();
    }

    private scoreText:egret.BitmapText;

    private init():void
    {   
        this.game_level = new GameLevel();
        this.init_level_ground();
        this.init_playground();
        this.init_time_bar();
        var level: number = 1;
        var sub_level: number = 1;
        this.updateNumbers(this.game_level.box_num);
        this.get_target_num();
        this.init_paly_pannel(this.game_level.box_num);
        // // this.init_paly_pannel(this.game_level.box_num);
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
        //显示区背景颜色
        level_ground.graphics.beginFill(0xccd8d6);
        level_ground.graphics.drawRoundRect(0, 0, width, width, 10, 10);
        level_ground.graphics.endFill();
        this.target_field = new egret.Sprite();
        this.target_field.x = 5;
        this.target_field.y = 5;
        this.target_field.width = (width - 10) / 3;
        this.target_field.height = (width - 10) / 3;
        //目标值背景颜色
        this.target_field.graphics.beginFill(0x9eaea4);
        this.target_field.graphics.drawRoundRect(0, 0, this.target_field.width, this.target_field.width, 10, 10);
        this.target_field.graphics.endFill();
        var target_label = new egret.TextField();
        target_label.text = "目标值:";
        target_label.fontFamily = "Regular";
        target_label.textColor = 0xccd8d6;
        target_label.size = target_label.size;
        target_label.width = this.target_field.width;
        target_label.height = this.target_field.height /4;
        target_label.bold = true;
        // target_label.stroke = 3;
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
        
        // ==================中间分数值=================================
        var score_ground = new egret.Sprite();
        score_ground.x = this.target_field.x + this.tagert_text_field.width;
        score_ground.y = 0;
        score_ground.width = width;
        score_ground.height = this.height * 0.2;
        this.score_field = new egret.Sprite();
        this.score_field.x = 5;
        this.score_field.y = 5;
        this.score_field.width = (width - 10) / 3;
        this.score_field.height = (width - 10) / 3;
        //分数值背景颜色
        this.score_field.graphics.beginFill(0x91afbb);
        this.score_field.graphics.drawRoundRect(0, 0, this.target_field.width - 10, this.target_field.width, 10, 10);
        this.score_field.graphics.endFill();
        var score_label = new egret.TextField();
        score_label.text = "分数:";
        score_label.fontFamily = "Regular";
        score_label.textColor = 0xccd8d6;
        score_label.size = target_label.size;
        score_label.width = this.target_field.width;
        score_label.height = this.target_field.height /4;
        score_label.bold = true;
        // score_label.stroke = 3;
        score_label.x = 10;
        score_label.y = 5;
        this.score_field.addChild(score_label);
        this.score_text_field = new egret.TextField();
        this.score_text_field.background = true;
        this.score_text_field.backgroundColor = 0x91afbb
        this.score_text_field.text = this.score.toString();
        this.score_text_field.width = this.target_field.width - 10;
        this.score_text_field.y = this.target_field.width * 0.3 
        this.score_text_field.height = this.target_field.height * 0.7;
        this.score_text_field.size = this.target_field.width * 0.2;
        this.score_text_field.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.score_text_field.textAlign = egret.HorizontalAlign.CENTER;
        this.score_text_field.bold = true;
        this.score_field.addChild(this.score_text_field);
       
        score_ground.addChild(this.score_field);
        level_ground.addChild(score_ground);
        // ==================右上角当前点击值============================

        var cur_ground = new egret.Sprite();

        cur_ground.x = width - (width - 10) / 3 - 10;
        cur_ground.y = 0;
        cur_ground.width = width;
        cur_ground.height = this.height * 0.2;
        this.cur_field = new egret.Sprite();
        this.cur_field.x = 5;
        this.cur_field.y = 5;
        this.cur_field.width = (width - 10) / 3;
        this.cur_field.height = (width - 10) / 3;
        //点击值背景颜色
        this.cur_field.graphics.beginFill(0xa7bfbf);
        this.cur_field.graphics.drawRoundRect(0, 0, this.target_field.width, this.target_field.width, 10, 10);
        this.cur_field.graphics.endFill();
        var cur_label = new egret.TextField();
        cur_label.text = "点击值:";
        cur_label.fontFamily = "Regular";
        cur_label.textColor = 0xccd8d6;
        cur_label.size = cur_label.size;
        cur_label.width = this.target_field.width;
        cur_label.height = this.target_field.height /4;
        cur_label.bold = true;
        // cur_label.stroke = 3;
        cur_label.x = 10;
        cur_label.y = 5;
        this.cur_field.addChild(cur_label);
        this.cur_text_field = new egret.TextField();
        this.cur_text_field.background = true;
        this.cur_text_field.backgroundColor = 0xa7bfbf
        this.cur_text_field.text = '';
        this.cur_text_field.width = this.target_field.width;
        this.cur_text_field.y = this.target_field.width * 0.3 
        this.cur_text_field.height = this.target_field.height * 0.7;
        this.cur_text_field.size = this.target_field.width * 0.7;
        this.cur_text_field.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.cur_text_field.textAlign = egret.HorizontalAlign.CENTER;
        this.cur_text_field.bold = true;
        this.cur_field.addChild(this.cur_text_field);
       
        cur_ground.addChild(this.cur_field);
        level_ground.addChild(cur_ground);
        this.addChild(level_ground);
    }



    private init_playground(): void {
        var width = this.width * 0.9;
        var x = (this.width - width)/2;
        var y = this.height * 0.3;
        if(this.playground){
            this.playground.removeChildren();
        }else{
            this.playground = new egret.Sprite();
        }

        this.playground.x = x;
        this.playground.y = y;
        this.playground.width = width;
        this.playground.height = width;
        // 游戏区背景颜色
        this.playground.graphics.beginFill(0xccd8d6);
        this.playground.graphics.drawRoundRect(0, 0, width, width, 10, 10);
        this.playground.graphics.endFill();
        this.addChild(this.playground);
    }
    
    private init_paly_pannel(len): void
    {   
        var col: number = 5; //间隔
        var l_width = (this.playground.width - col * (len + 1)) / len;
        
        var x = 5;
        var y = 5;
        this.playground.removeChildren();
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
                label.size = l_width * 0.8;
                label.bold = true;
                label.textColor = 0xffffff;
                this.playground.addChild(label);
                x = x + l_width + 5;
            }
            x = 5;
            y = y + l_width + 5;
        }
    }

    public init_time_bar():void
    {
        this.timer = new egret.Timer(1000,10);
        this.timeBar = new egret.Sprite();
        var width = this.width * 0.9;

        this.timeBar.width = width - 10;
        this.timeBar.height = 20;
        
        var x = (this.width - width)/2;
        this.timeBar.x = x + 5;
        this.timeBar.y = 200;
        this.timeBar.graphics.beginFill(0xa7bfbf);
        this.timeBar.graphics.drawRoundRect(0, 0, this.timeBar.width, this.timeBar.height, 10, 10);
        this.timeBar.graphics.endFill();
        
        console.log("添加时间条");
        this.addChild(this.timeBar);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
    }

    public timerFunc():void
    {
        console.log("pass time");
        this.timePassed = this.timePassed + 1;
        if(this.timePassed >=10){
            return;
        }    
        this.timeBar.graphics.clear()
        // this.timeBar.width = this.timeBar.width - 10;
        var width = this.timeBar.width * (1 - this.timePassed / 10);
        this.timeBar.graphics.beginFill(0xa7bfbf);
        this.timeBar.graphics.drawRoundRect(0, 0, width, this.timeBar.height, 10, 10);
        this.timeBar.graphics.endFill();
    }

    public timerComFunc():void
    {
        console.log("game over");
    }
    
    public startgame():void
    {
        this.timer.start();
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


    private get_nears_from_xy(x: number, y:number){
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


    private getNears(event):Array<Array<number>> {       
        var x:number = event.localX;
        var y:number = event.localY;
        return this.get_nears_from_xy(x, y);
    }
    
    
    private touchNearBoxes(event) {
        var nears = this.getNears(event);
        for(var i = 0;i < this.number_boxes.length; i ++ ){ 
            for(var j = 0;j < this.number_boxes[i].length;j++) { 
                this.number_bits[i][j].backgroundColor = 0xa7bfbf;
            }
        }
        
        for(var k = 0;k < nears.length; k ++ ){ 
            var m = nears[k][0];
            var n = nears[k][1];
            this.number_bits[m][n].backgroundColor = 0x7ca3b5;
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
        var nears_num = Array<Number>();
        
        for(var k = 0;k < nears.length; k ++ ){ 
            var m = nears[k][0];
            var n = nears[k][1];
            var cur = this.number_boxes[m][n];
            nears_num.push(cur);
            sum = cur + sum;
            this.number_bits[m][n].backgroundColor = 0xFF9999;
        }
        console.log("ners:")
        console.log(nears_num.toString());
        console.log("sum")
        console.log(sum);
        this.cur_text_field.text = sum.toString();
        if(sum == this.target_num){
            // console.log("=======2");
            this.cur_text_field.backgroundColor = 0x00EE00;
            this.passLevel();
        }else{
            this.cur_text_field.backgroundColor = 0xFF4040;
            this.bad();
            for(var k = 0;k < nears.length; k ++ ){ 
            var m = nears[k][0];
            var n = nears[k][1];
            var cur = this.number_boxes[m][n];
            nears_num.push(cur);
            sum = cur + sum;
            this.number_bits[m][n].backgroundColor = 0xa7bfbf;
        }
        }
    }

    private bad():void{
        this.timePassed = this.timePassed + 2;
        this.timerFunc();
        
    }

    private passLevel():void{
        this.game_level.pass_level();
        this.removeChild(this.playground);
        this.init_playground();
        this.updateNumbers(this.game_level.box_num);
        this.init_paly_pannel(this.game_level.box_num);
        this.playground.touchEnabled = true;
        this.playground.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchNearBoxes, this);
        this.playground.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchNearBoxes, this);
        this.playground.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEndNearBoxes, this);
        this.playground.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEndNearBoxes, this);
        this.get_target_num();
        this.timeBar.graphics.clear();
        var width = this.timeBar.width;
        this.timeBar.graphics.beginFill(0xa7bfbf);
        this.timeBar.graphics.drawRoundRect(0, 0, width, this.timeBar.height, 10, 10);
        this.timeBar.graphics.endFill();
        this.timePassed = 0;
        this.timer.reset();
        this.timer.start();
        this.update_score();
    }

    private update_score():void{
        this.score = this.score + 10;
        this.score_text_field.text = this.score.toString();
    }
}