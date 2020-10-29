$(function () {
    //监听游戏规则
    $('.rule').on('click', function () {
        $('.rule-item').stop().fadeIn(200)
        $(this).css('cursor', 'pointer')
    })
    //监听关闭游戏规则
    $('.rule-item a').click(function () {
        $('.rule-item').fadeOut(200);
    })
    //监听开始游戏那妞
    $('.start').on('click', function () {
        $(this).stop().fadeOut(100);
        wolfAnimals();


        //监听重新开始页面
        $('.restart').on('click', function () {
            //重新开始页面消失
            $('.gameover').stop().fadeOut(200)
            //再次调用进度条递减函数
            progressHandler();
            //调用灰太狼动画的方法
            wolfAnimals();
        })
        //调用处理进度条的
        progressHandler();
        //处理进度条的函数
        function progressHandler() {
            //重新设置进度条宽度
            $('.progress').width(180)
            //开启定时器使得宽度递减
            var timer = setInterval(function () {
                //拿到当前进度条的宽度
                var progressWidth = $('.progress').width();
                /* console.log(progressWidth); */
                //减少当前宽度
                progressWidth -= 1;
                //重新给进度条复制
                $('.progress').css({
                    width: progressWidth
                })
                //判断时候走完
                if (progressWidth == 0) {
                    //关闭定时器
                    clearInterval(timer);
                    //显示重新开始页面
                    $('.gameover').stop().fadeIn(200);
                    //停止灰太狼动画
                    stopWolfAnimals()
                }
            }, 1000);
        }
        //处理灰太狼动画的方法
        var timer1;
        function wolfAnimals() {
            //1.定义两个数组保存小灰灰和灰太狼的图片
            //记住图片时从index页面加载，所以这里的路径要相对于页面
            var wolfHui = [
                'img/h0.png', 'img/h1.png', 'img/h2.png', 'img/h3.png', 'img/h4.png', 'img/h5.png', 'img/h6.png', 'img/h7.png', 'img/h8.png', 'img/h9.png'
            ]
            var wolfXhuihui = [
                'img/x0.png', 'img/x1.png', 'img/x2.png', 'img/x3.png', 'img/x4.png', 'img/x5.png', 'img/x6.png', 'img/x7.png', 'img/x8.png', 'img/x9.png'
            ]
            //2.定义一个数组保存所有可能出现的位置
            var arrPo8 = [
                { left: '100px', top: '115px' },
                { left: '190px', top: '142px' },
                { left: '105px', top: '193px' },
                { left: '19px', top: '221px' },
                { left: '202px', top: '212px' },
                { left: '120px', top: '275px' },
                { left: '30px', top: '295px' },
                { left: '209px', top: '297px' },
            ]
            //3.创建一个图片
            var $wolfImag = $('<img src="" class="wolfImg">')
            //随机获取图片的位置
            var posIndex = Math.round(Math.random() * 8);

            //4.设置图片显示的位置
            $wolfImag.css({
                position: 'absolute',
                left: arrPo8[posIndex].left,
                top: arrPo8[posIndex].top
            })
            //随机获取数组
            var arrWolfIndex = Math.round(Math.random()) == 0 ? wolfHui : wolfXhuihui;
            //5.设置图片的内容1
            window.wolfTimer = 0;
            window.wolfIndexEnd = 5;
            timer1 = setInterval(() => {
                if (wolfTimer > wolfIndexEnd) {
                    $wolfImag.remove();
                    clearInterval(timer1);
                    wolfAnimals()
                }
                $wolfImag.attr('src', arrWolfIndex[wolfTimer])
                wolfTimer++
            }, 300);
            //6.将图片添加到页面上
            $('.container').append($wolfImag)

            //7.调用处理游戏规则的动画
            gameRules($wolfImag)
        }

        //游戏规则处理
        function gameRules($wolfImag) {
            $wolfImag.one('click', function () {
                // alert(1);
                //修改索引
                window.wolfTimer = 5;
                window.wolfIndexEnd = 9;
                //拿到当前图片的地址
                var $addr = $(this).attr('src');
                //根据图片地址时候是灰太狼
                var flag = $addr.indexOf('h') > 0;
                // console.log(flag);
                //根据点击的图片类型增减分数
                if (flag) {
                    //分数+10
                    var newScore = parseInt($('.score').text()) + 10;
                    $('.score').text(newScore);
                }
                else {
                    //分数-10
                    var newScore1 = parseInt($('.score').text()) - 10;
                    $('.score').text(newScore1);
                }

            })
        }
        //
        function stopWolfAnimals() {
            $('.wolfImg').remove();
            clearInterval(timer1)
        }
    })
})
console.log(Math.round(Math.random() * 8));