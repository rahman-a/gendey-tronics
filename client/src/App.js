import {Switch, Route} from 'react-router-dom'
import Home from "./views/Home";
import Account from './views/Account'
import Credential from './views/Credential';
import Blogs from './views/AllBlogs'
import Blog from './views/Blog'
import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsAndCondition from "./views/TermsAndConditions";
import SalesTerms from "./views/SalesTerms/indx";
import VideoGallery from "./views/VideoGallery";
import PhotoGallery from "./views/PhotoGallery";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <Home/> 
        </Route>
        <Route path='/account'>
          <Account/> 
        </Route>
        <Route path='/login'>
          <Credential/> 
        </Route>
        <Route path='/blogs'>
          <Blogs/>
        </Route>
        <Route path='/blog'>
          <Blog/> 
        </Route>
        <Route path='/privacy-policy'>
          <PrivacyPolicy/> 
        </Route>
        <Route path='/terms-and-condition'>
          <TermsAndCondition/> 
        </Route>
        <Route path='/sales-terms'>
          <SalesTerms/> 
        </Route>
        <Route path='/videos-gallery'>
          <VideoGallery/> 
        </Route>
        <Route path='/photo-gallery'>
          <PhotoGallery/> 
        </Route>
      </Switch>
    </div>
  );
}

export default App;
