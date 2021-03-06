import { Component } from '@angular/core';
import { SimpleTreeService } from '../../local_data_services/simple.tree.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  treedata = [];
  treedata1 = [];

  addBroFn(nodeobj){
    console.log(nodeobj);
      console.log("添加兄弟节点");
      let new_tree;
      //new_tree = this.dp.transitionData(this.NEW_DATA);
      console.log(this.dp);
}

  // 右键菜单的数据
  MENU_DATA = 
  [{
    text:"添加兄弟节点",
    clickFn: this.addBroFn,
  },{
    text:"添加子节点",
    clickFn:function(nodeobj){
      console.log(nodeobj);
        console.log("添加子节点");     
    }
  },{
    text:"删除",
    clickFn:function(nodeobj){
      console.log(nodeobj);
        console.log("删除");
    }
  },{
    text:"修改",
    clickFn:function(nodeobj){
      console.log(nodeobj);
        console.log("修改");
    }
  },];
  // 新添加进来的一组数据
  NEW_DATA = {
    id: 10,
    pid: 3,
    text: "消化科",
    treeheight: 2,
    
  };

  settings = {
    menu: this.MENU_DATA,
    nodeclick: this.onclick,
    showicon: "ion-arrow-down-b",
    hideicon: "ion-arrow-right-b",
    filterstyle: "isshow",//isshow|mark
    filtertype: "clientfilter",//serverfilter|clientfilter
  };
  
  constructor(private dp: SimpleTreeService){
      this.treedata = dp.getASimpleTree();
      // 异步promise
      dp.getTreeData().then((tree) => {
        this.treedata1 = tree;
      });
  }
  onclick(obj){
    console.log("node clicked");
    console.dir(obj);
  }
  search(value){
    console.log("搜索值", value);
    this.treedata.forEach(item => {
      this.checkdata(item,value);
    });

    this.treedata.forEach(item => {
      this.checkdata1(item, item,value);
    });

    console.log(this.treedata);
  }

  checkdata(obj,value) {
    if(obj.text !== value){
      obj.visiable = false
    }
    if(obj.children) {
        for(let i of obj.children) {
            this.checkdata(i,value);
        }
    }
  }

  checkdata1(obj,parentobj,value) {
    
    if(obj.children) {
        for(let i of obj.children) {
            this.checkdata1(i, obj , value);
        }
    }else{
      if(obj.visiable == true){
        parentobj["visiable"] = true
      }
    }
  }

}
