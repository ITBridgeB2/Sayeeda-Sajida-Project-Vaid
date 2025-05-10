import { useNavigate } from "react-router-dom";
import DataDisplayComponent from "./registerDisplay";


export default function ViewRecords(){
    const navigate=useNavigate();
return(<div style={{width:"maxcontent", margin: 50}}>
<DataDisplayComponent></DataDisplayComponent>
<button style={{width:"30%"}} onClick={()=>navigate('/AdminSuccess')}>back</button>
</div>
)}