/**
 *
 * @author liurz
 *
 */
class GameLevel {
    public level: number;
    public sub_level: number;
    public box_num: number;
    public target_boxes_num: number;
    public max_number: number;
    
	public constructor() {
        this.level = 1;
        this.sub_level = 1;
        this.box_num = 4;
        this.target_boxes_num = 4;
        this.max_number = 1;
	}
	
    public pass_level(): void
    { 
        if(this.sub_level == 5) {
            this.level = this.level + 1;
            this.sub_level = 1;
            if(this.max_number < 9){
                this.max_number = this.max_number + 1;
            }
            if(this.level % 5 == 0){
                this.box_num = this.box_num + 1;
            }
        }
        else { 
            this.sub_level = this.sub_level + 1;
        }      
    }
}
