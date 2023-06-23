import "./footer.scss";
import logo from "../img/logo.png";
import git_log from "../img/github-mark.png"

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-left">
                <img src={logo} alt="Logo" className="footer-logo" />
                <p>&copy; 2023 S.with. All rights reserved.</p>
            </div>
            <div className="footer-right">
                <div className="footer-right-top">
                    <b>사업자등록번호 : 102-81-42945</b><br />
                    <b>경기도 성남시 분당구 불정로 90 (정자동)</b>
                </div>
                <div className="footer-right-bottom">
                    <div className="footer-right-bottom-left">
                        <div>
                            <b>TEAM 21(Contact Us)</b>
                        </div>
                        <div>
                            AI : <a href="https://github.com/brightface" target="_blank">김용환</a>{' '}
                            <a href="https://github.com/kj021" target="_blank">장규진</a>{' '}
                            <a href="https://github.com/CYeryeong" target="_blank">조예령</a>
                        </div>
                        <div className="team">
                            FE : <a href="https://github.com/Yjason-K" target="_blank">김영재</a>{' '}
                            <a href="https://github.com/18-12847" target="_blank">오승재</a>
                        </div>
                        <div className="team">
                            BE : <a href="https://github.com/only-juun" target="_blank">남환준</a>{' '}
                            <a href="https://github.com/leehanjun506" target="_blank">이한준</a>
                        </div>
                    </div>
                    <div className="footer-right-bottom-middle">
                        <div><b>TEL</b> : 010-1234-5678</div>
                        <div><b>FAX</b> : 010-1234-5678</div>
                    </div>
                    <div className="footer-right-bottom-right">
                        <a href="https://github.com/AIVLE-School-Third-Big-Project/AIVLE_BigProject_team21" target="_blank">
                            <img src={git_log} alt="Github" className="github-logo" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;