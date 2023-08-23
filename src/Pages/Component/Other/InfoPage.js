
import "../../CSS/other.css"
import boy from '../../Image/happy-boy.png'
import CrazyGirl from '../../Image/crazy-girl.png'
import dashingGirl from '../../Image/dashing-gir.png';
import glassGirl from '../../Image/glass-girl.png';
import glassMan from '../../Image/glass-man.png';
import happyBoy from '../../Image/happy-boy.png';
import collegeTeacher from '../../Image/college-teacher.png';
const InfoPage = () => {
    return (
        <div className={'main-box-1'}>
            <div className={'info-header'}>Welcome to <span style={{color:"#EC7063",fontSize:'30px',fontWeight:'lighter'}}>Alma-Better</span> Quiz App</div>
            <p className={'info-header'} style={{fontSize:'16px',marginTop:'1%',marginBottom:'3%'}}>This is a Quiz App where you can create your own quiz and play it.</p>
            <div className={'info-body'}>
                <div className={'right-animation'}>
                    <div className={'info-body-img'}>
                        <img src={boy}  className={'avator'}/>
                    </div>
                    <div className={'right-body-text'}>" Engaging quizzes that make learning fun and interactive! "    -  S.OP.DUMMY</div>
                </div>
                <div className={'left-animation'} style={{float:'right'}}>
                    <div className={'right-body-text'}>"Addictively fun quizzes that make learning feel like a game!"</div>
                    <div className={'info-body-img'}>
                        <img src={CrazyGirl}  className={'avator'}/>
                    </div>
                </div>
                <div className={'right-animation'}>
                    <div className={'info-body-img'}>
                        <img src={glassMan}  className={'avator'}/>
                    </div>
                    <div className={'right-body-text'}>"Addictive quizzes that make learning feel like a game!"</div>
                </div>
                <div className={'left-animation'} style={{float:'right'}}>
                    <div className={'right-body-text'}>"Addictive quizzes that make learning fun!"</div>
                    <div className={'info-body-img'}>
                        <img src={collegeTeacher}  className={'avator'}/>
                    </div>
                </div>
                <div className={'right-animation'}>
                    <div className={'info-body-img'}>
                        <img src={happyBoy}  className={'avator'}/>
                    </div>
                    <div className={'right-body-text'}>"Addictive quizzes, can't stop playing!"</div>
                </div>
                <div className={'left-animation'} style={{float:'right'}}>
                    <div className={'right-body-text'}>"Addictive quizzes, a great way to learn while having fun!"</div>
                    <div className={'info-body-img'}>
                        <img src={glassGirl}  className={'avator'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoPage