import React, { Component } from "react";
import { Link } from "react-router-dom";
class PrivacyPolicy extends Component {
  state = {};
  render() {
    return (
      <div className="container mx-auto">
        <section className="bg-white-lightest md:py-8">
          <div className="w-full max-w-2xl ml-auto mr-auto">
            <div className="flex flex-wrap ">
              <div className="bg-green-lightest w-full rounded shadow-lg overflow-hidden p-8">
                <h2 className="py-2">Privacy Policy</h2>
                <p className="py-2">
                  Your privacy is important to us. It is UniBoard's policy to
                  respect your privacy regarding any information we may collect
                  from you across our website,{" "}
                  <a href="http://uniboard.app">http://uniboard.app</a>, and
                  other sites we own and operate.
                </p>
                <p className="py-2">
                  We only ask for personal information when we truly need it to
                  provide a service to you. We collect it by fair and lawful
                  means, with your knowledge and consent. We also let you know
                  why we’re collecting it and how it will be used.
                </p>
                <p className="py-2">
                  We only retain collected information for as long as necessary
                  to provide you with your requested service. What data we
                  store, we’ll protect within commercially acceptable means to
                  prevent loss and theft, as well as unauthorised access,
                  disclosure, copying, use or modification.
                </p>
                <p className="py-2">
                  We don’t share any personally identifying information publicly
                  or with third-parties, except when required to by law.
                </p>
                <p className="py-2">
                  Our website may link to external sites that are not operated
                  by us. Please be aware that we have no control over the
                  content and practices of these sites, and cannot accept
                  responsibility or liability for their respective privacy
                  policies.
                </p>
                <p className="py-2">
                  You are free to refuse our request for your personal
                  information, with the understanding that we may be unable to
                  provide you with some of your desired services.
                </p>
                <p>
                  Your continued use of our website will be regarded as
                  acceptance of our practices around privacy and personal
                  information. If you have any questions about how we handle
                  user data and personal information, feel free to contact us.
                </p>
                <p className="py-2">
                  This policy is effective as of 6 February 2019.
                </p>
                <Link to="/home" className="no-underline">
                  <button className="bg-transparent text-xl leading-none text-blue block font-semibold hover:text-blue-dark h-10 px-6 border border-blue-lighter hover:border-blue-light rounded-full whitespace-no-wrap m-auto">
                    Back To Homepage
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default PrivacyPolicy;
