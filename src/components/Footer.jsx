import '../assets/css/footer.css';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
const about = {
    name : "Dipankor Konwar",
    tech : "React JS",
    portfolio : "https://portfolio-konwardks-projects.vercel.app/",
    linkedin : "https://www.linkedin.com/in/dipankor-konwar/",
    facebook : "https://www.facebook.com/",
    email : "dipankorkonwar15@gmail.com",


}

export const Footer =()=>{
    return (
        <>
            <div className="about">
                <div className="footer">
                    <div className="">
                        <p>This application is developed by <span className='name'>{about.name}</span> using <span className='tech'>{about.tech}</span> <br /></p>
                    </div>
                    <div className="">
                        <p>For more information, visit </p>
                        <ul>
                            <li>
                                <a className='link' href={about.portfolio} target="_blank" rel="noopener noreferrer"><ImProfile />Portfolio</a>
                            </li>
                            <li>
                                <a className='link' href={about.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin />LinkedIn</a></li>
                            <li> 
                                <a className='link' href={about.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook />Facebook</a></li>
                        </ul>
                    </div>
                    <div className="">
                        <p>For any queries, feel free to reach out via email:</p>
                            <a href={about.email}>dipankorkonwar15@gmail.com</a>
                    </div>
                </div>
            </div>
        </>
    )
}