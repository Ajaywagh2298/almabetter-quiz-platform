
import "../../CSS/CourseCard.css";
import boy from '../../Image/happy-boy.png'
const CourseCard = ({ data, color, onClick}) => {

    return (
        <div className="ag-courses_item">
            <div  className="ag-courses-item_link" onClick={onClick}>
                <div className="ag-courses-item_bg" style={{ backgroundColor: color ? color : '#433334' }}></div>
                <img src={boy} height={'100px'}  className={'ag-courses-item_avatar'} alt={'#'}/>
                <div className="ag-courses-item_title">
                    {data.title}
                </div>
                <div className="ag-courses-item_date-box">
                   Start : {data.createdOn.getDate()}-{data.createdOn.getMonth() + 1}-
                    {data.createdOn.getFullYear()} {data.createdOn.getHours()}:
                    {data.createdOn.getMinutes()}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;