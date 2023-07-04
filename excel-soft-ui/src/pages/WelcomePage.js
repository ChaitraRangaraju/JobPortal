import {Link} from 'react-router-dom'

const Welcome = () => {
    return(
        <>
                <div id="home" class="back"> <p>Finding your passion is the key to your success</p><br></br>
                {/* <a href="">Apply now</a> */}
                <Link className='linkWel' to={"/jobs"}>Apply now </Link>
                </div>

                <div id="location">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/74/Location_icon_from_Noun_Project.png" alt="Location" width="70" height="80"></img>
                &nbsp;&nbsp;&nbsp;&nbsp;Interview Date : Every Wednesday<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;Location :  Hootagalli Industrial Area, 1-B, Mysuru, Karnataka 570018
                </div>
            
        </>
        
    )

}

export default Welcome;