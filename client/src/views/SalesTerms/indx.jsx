import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'

const PrivacyPolicy = () => {
    return (
        <Template>
            <div className={style.sales}>
                <figure>
                    <img src="images/img-4.png" alt="mechanic"/>
                    <h1>Sales Terms</h1>
                </figure>
                 <div className="container">
                    <div className={style.sales__content}>
                        <p className={style.sales__content_start}>
                        First of all, we welcome you to the online store of (Gendy Tronics Company), 
                        and we are pleased to present this privacy policy regarding the information 
                        that is received, used and exchanged within the framework of the business 
                        and services provided to our valued customers.</p>

                        <p>In the event that you (the user) use the website https://www.gendyecu.com, this means 
                        your final and unconditional approval of this privacy policy.</p>

                        <p>Please note that this privacy policy is updated from time to time, 
                        and that you are obligated to comply with the last update published 
                        to the policy on our website, and accordingly, you should review this 
                        policy frequently to see the latest versions, keeping your information 
                        always updated is important, as You can access your account information, 
                        which includes your contact information. If you notice discrepancies in your 
                        personal information, please inform us so that we can make the necessary updates 
                        or adjustments.</p>

                        <p className={style.sales__content_header}>
                            First: the information that is collected from you.</p>
                        <ul>
                            <li>Personal data: This data includes name, gender, nationality, date of birth, address, 
                            mobile number, e-mail and your products, in addition to the data you provide to obtain
                            membership in our loyalty program "for you" and / or any data Necessary to fulfill 
                            the requests specified by you and all the data we see as necessary.</li>
                            <li>General information: This includes information that we receive from you as 
                            statistical information for the website, such as "IP address", browser type, 
                            device type, operating system, URL and cookies, information of the transactions 
                            that you have made on our website such as sales, order history, correspondence 
                            history or instant conversations on our website and product preferences And 
                            information that you have provided to us through competitions, contests, 
                            promotions, opinion polls, notes, and / or any other information that we 
                            consider necessary to enhance your experience using the site.</li>
                        </ul>
                        <p className={style.sales__content_header}>Second: When do we collect information from you?</p>
                        <ul>
                            <li>Information will be collected from you if you log in and / or browse the online 
                            store or request a service such as buying our products through the online sale / 
                            purchase platform or our mobile application or any of our other electronic pages, 
                            or if you joined our loyalty program "for you" or contacted us from During the site.</li>
                            <li>We may also collect information through the use of third parties who have 
                            specialized technologies, and you may not have to provide us with the information, 
                            but in some cases if you do not, this may mean that you are unable to use our 
                            services, for example we may not be able to complete any request you wish. 
                            In conducting it, or you may not be able to join our loyalty program "for you".</li>
                            <li>Other times there may be gatherings in which we use your information, 
                            for example: if you choose to participate in one of the competitions / 
                            contests or when registering to receive our newsletters or promotions, 
                            or when you download our applications on the mobile phone or when you 
                            contact us to express your comments or questions or to provide you with 
                            support And in those cases, we will collect information from you to 
                            manage and organize the competition, offer or the relevant service that 
                            you have chosen, and in each of these cases we will collect, use and secure 
                            information in a manner consistent with the general principles outlined in this policy.</li>
                        </ul>
  
                        <p className={style.sales__content_header}>Third: Where do we use your information?</p> 
                        <ul>
                            <li>Your information is used for the purposes of processing and fulfilling requests, 
                            and providing you with the products and services that you have requested, 
                            and because we work over a network, your information may be used by branches, 
                            exhibitions, warehouses, service centers, technical support, data centers, 
                            logistics and service providers who perform some services on our behalf such 
                            as a broker to complete payment procedures and transactions. Through the 
                            Internet, marketing companies, advertisements, research and / or any 
                            service necessary to complete the procedures of your requests, such as 
                            verifying financial transactions that take place on our website, 
                            including performing balance checks or detecting fraud.</li>
                            <li>Our use of your information is necessary to fulfill the responsibilities 
                            that we have towards our regulators, tax officials, law enforcement agencies or 
                            other legal responsibilities, and our use of your information is in our legitimate 
                            interest as a commercial organization, for example to operate and improve our 
                            services and to keep our customers informed about our products And our services 
                            and in these cases we will take care of your information at all times in a manner 
                            that is proportionate and respects your privacy rights.</li>
                            <li>We and our service providers use your information for functional and / or marketing 
                            purposes in order to improve your experience when you use our online store and to 
                            provide you with the best services and to ensure that the content of our store is 
                            presented in the most effective way, and to provide the services that you have 
                            requested or participated in, and taking into account the requirements of local 
                            content, we may use this information To help us and service providers to identify 
                            other devices that you use, for example a mobile phone or tablet device, etc., 
                            we and service providers may also use the tracking feature across devices and 
                            other information that we know about you to serve ads targeted to your devices 
                            and to show you the messages that interest you, and we also use the information 
                            that we use. We collect them to improve our products and services, as well as 
                            improve your experience when you visit our website or use our mobile application, 
                            and if you do not want to accept these files, you can block them by modifying the 
                            Internet browser settings, and if you block them, you may not be able to use all 
                            the features of our website. .</li>
                        </ul>

                       <p className={style.sales__content_header}>Fourth: How do we protect your information?</p> 
                        <ul>
                            <li>The information that you provide to us through our online store is stored on secure 
                            servers to protect your information from unauthorized access, disclosure or damage, 
                            and technical, material and organizational security standards have been put in place 
                            to protect it. We take measures to ensure that appropriate security safeguards are 
                            in place to protect your information with an adequate level of legal protection or 
                            where we can be satisfied that arrangements exist to protect your privacy rights.</li>
                            <li>We reserve the right to disclose any personal information that we have related to 
                            you if we are obliged to do so under judicial procedures or if requested by 
                            a government entity or if we decide that it is necessary or desirable to 
                            comply with the system or instructions issued by the competent official 
                            authorities or to protect or defend our rights accordingly. In compliance 
                            with applicable laws, we also reserve the right to retain collected personal 
                            information and process such personal information to comply with accounting 
                            and tax regulations and / or any records retention laws.</li>
                        </ul>
  
                        <p className={style.sales__content_header}>For more information:</p> 

                        <p>If you have any questions about this privacy policy, we are happy to contact you 
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        via: <a>Contact us</a> </p>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default PrivacyPolicy
