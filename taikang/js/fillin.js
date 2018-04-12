window.onload=function(){
   
    var isection1=document.getElementById('section1');
    var isection2=document.getElementById('section2');
    // section1
    isection1.querySelector('.begin_btn').onclick=function(){
        //淡化消失
        var opacity_0s=isection1.querySelectorAll('.opacity_0');
        for(var i=0,l=opacity_0s.length;i<l;i++){
            opacity_0s[i].style.opacity=0;
        }
        isection1.querySelector('.record').style.webkitTransform='scale(0)';
        // 进入section2
        setTimeout(function(){
            
            isection1.querySelector('.next_step').style.display='block';
            setTimeout(function(){
                isection2.style.display='block';
            },2000);
        },600);
    }
    //section2
    var istep1=document.getElementById('step1');
    var istep2=document.getElementById('step2');
    var istep3=document.getElementById('step3');
    var istep4=document.getElementById('step4');
    var istep5=document.getElementById('step5');
    var now_step=0;//当前步骤数
    // step1
    istep1.querySelector('.camera_btn').onclick=function(){
        // 显示相机图片提示信息
        var qcamera_wraper=istep1.querySelector('.camera_wraper');
        qcamera_wraper.style.display='none';
        //更换文件图片动画
        var qcamera_img=istep1.querySelector('.pic_wraper img');
        qcamera_img.style.animationName='big_small';
        //显示对号按钮
        var qcorrect_btn=istep1.querySelector('.correct_btn');
        qcorrect_btn.style.display='block';
        //显示提示信息
        var iwram_tips=istep1.querySelector('.wram_tips');
        iwram_tips.style.display='block';
        //自动进行第二步
        setTimeout(function(){
            qcorrect_btn.style.backgroundImage='url(images/camera.png)';
            qcamera_img.style.animationName='left_out';

            setTimeout(function(){
                change_step('add');
            },500);
        },1000);
    }
    //step2
    istep2.querySelector('.camera_btn').onclick=function(){
        istep2.querySelector('.card_wraper').style.display='none';
        var cards_container=istep2.querySelector('.cards_container');
        cards_container.style.display='block';
        var add_one_btn=istep2.querySelector('.add_one');
        add_card(cards_container,add_one_btn,'images/id_card.jpeg');
        // 添加图片
        add_one_btn.onclick=function(){
            add_card(cards_container,add_one_btn,'images/id_card_back.jpeg');
            this.parentNode.removeChild(this);
            setTimeout(function(){
                cards_container.style.animationName='cards_leave';
                step2.querySelector('.wram_tips').style.opacity=0;
                setTimeout(function(){
                    change_step('add');
                },500);
            },1000);
            
        }
    }
    /**
     * 新增card图片节点
     * @param {obj} parentNode 父级节点
     * @param {obj} lastNode   此节点前增加
     * @param {string} img_src   图片路径
     */
    function add_card(parentNode,lastNode,img_src){
        var new_div=document.createElement('div');
        new_div.setAttribute('class','one_card');
        
        var new_img=new Image();
        new_img.src=img_src;
        new_div.appendChild(new_img);

        var icon_span=document.createElement('span');
        icon_span.setAttribute('class','close_icon');
        icon_span.innerText='×';
        icon_span.onclick=function(){
            var delNode=this.parentNode;
            var delparentNode=delNode.parentNode;
            delparentNode.removeChild(delNode);
        }
        new_div.appendChild(icon_span);

        parentNode.insertBefore(new_div,lastNode);
    }
    //step3
    istep3.querySelector('.camera_btn').onclick=function(){
        //扫描
        istep3.querySelector('.card_wraper').style.display='none';
        istep3.querySelector('.mess_wraper').style.display='block';
        setTimeout(function(){
            istep3.querySelector('.scan_wraper').style.display='none';
            istep3.querySelector('.card_mes').style.display='block';
        },2000);
    }
    istep3.querySelector('.one_card').onclick=function(){
        // 放大显示卡片
        this.setAttribute('class','one_card_big');
        //选定卡片
        this.querySelector('.choice_card').onclick=function(){
            var one_card_big=istep3.querySelector('.one_card_big');
            one_card_big.style.backgroundColor='rgba(0,0,0,0)';
            this.style.display='none';
            istep3.querySelector('.ocr_tips').style.opacity='0';
            istep3.querySelector('.add_one').style.opacity='0';
            one_card_big.getElementsByTagName('img')[0].style.animationName='card_big_img_scale';
            istep3.querySelector('.next_step_btn').style.display='block';
            one_card_big.style.zIndex=-1;
            istep3.querySelector('.next_step_btn').onclick=function(){
                    change_step('add');
            }
        }
    }
    //step4
    istep4.querySelector('.camera_btn').onclick=function(){
        istep4.querySelector('.card_wraper').style.display='none';
        var cards_container=istep4.querySelector('.cards_container');
        cards_container.style.display='block';
        var add_one_btn=istep4.querySelector('.add_one');
        add_one_btn.onclick=function(){
            add_card(cards_container,this,'images/prove2.png');
        }
    }
    //全局操作
    isection2.querySelector('.now_message').onclick=function (event) {
        var arrow_node=event.target.getAttribute('date-arrow');
        if(arrow_node=='left'){
            change_step('sub');
        }else if(arrow_node=='right'){
            change_step('add');
        }
    }
    //更改步骤事件
    function change_step(event) {
        //头部列表联动
        var circle_num=isection2.querySelectorAll('.circle_num');
        var all_step=isection2.querySelectorAll('.step');
        var header_mes=isection2.querySelector('.mess_text');
        var mess_arr=[
            '提交理赔申请书',
            '受益人身份证明',
            '银行卡信息',
            '诊断证明/出院小结',
            '其他补充材料'
        ];
        if(event=='add'){
            now_step++;
            if(now_step>4){
                now_step=4;
                alert('已是最后步骤');
            }
        }else if(event=='sub'){
            now_step--;
            if(now_step<0){
                now_step=0;
                alert('已是第一步骤')
            }
        }
        //更改顶部小圆圈样式，以及显示不同的step
        for(var i=0,l=circle_num.length;i<l;i++){
            circle_num[i].setAttribute('class','circle_num');
            all_step[i].style.display='none';
        }
        circle_num[now_step].setAttribute('class','circle_num active');
        all_step[now_step].style.display='block';
        // 修改头部信息
        isection2.querySelector('.mess_text').innerText=mess_arr[now_step];
    }
}