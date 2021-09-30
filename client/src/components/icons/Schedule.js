import * as React from "react";

function SvgSchedule(props) {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg"
    width='1em'
    height='1em'  
    viewBox="0 0 42 42"
    {...props}>
      <image 
        width="42" height="42" 
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeUAAAHlCAMAAAD87hRQAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAADpxJREFUeNrk1MWBRDEMA1CFOVH/zS4NfzrtyX4VGIV/4/wPC0WM/wU1TOq8WTVABVcmb0axUMDkxTczQDzX+a5aSOcnN5qBbJkbK0G2yL3pIJjp3KuqlnyzHMQyg1S2Zs9jw0CqymMZUpnFE0VTeN14VXd947XdNQdksjzXIVLmuaivZVpINPUd9uSFBIE8rxhNgX3T1aUXg77DXhCo80r+ZpcOBgAAQACIAdQjf9pAbgxbL/b1lCegTHkpU6ZMmTJlypQpU6ZMmTJlypQpU6ZMmTJlypQpU6ZMmTJlypQpU6ZMmTJlypQpU6ZMmTJlypQpU6ZMmTJlypQpU6ZMmTJlypQpU6ZMmTJlypQpU6ZMmTJlypQpU6ZMmfKza6dprrJAGIYLRGTm3f9mv+H86tATFa5AysO9gW58tDDqGspczqcHdqRyEukYqGzTg+Cc0W9V2IaCz9xIZYhkBio7fFbj9Salz4jGUOVduZGtotVsAV5ZeVcGqlvb+SzASyrvyk1nWkYnYFeeURkohtawFbvyrMqApxUCsCtPrIysaDaVsSvPrYx6rIy8K0+ovCCzytiVp1ZekFll7MorKk/NHDCh8q689hbswq68qjIizXFgV15XGRdNkXfllZWrXjqvW3FXHqi8dmarik7NKuyu/Mg/WRlm2oc9/MoGP8n0QEMky/kt4sYP7PpLGYVzeYb2lJCoDWc5l2TE+1zMF/oRYxm2/TMiBcZEqsQY75N35vL8LmUZS/YQKTPKhYE7Eb3yt3Lj6j9DHD3KkEn1bzx66Mi+lAeeHywnvlObo6Mg1Nl9MfuBrRD5fQY2KjVi78GxEKodw7ria0Uxhvvkka3HzmyVOz92iRCqUuPsfLekwGLphSxYInVlDtRQEOukhu2KTBdYwtJtuaF7MjtqOYgVqXXWjshUwJLohRJ4PH3i6u+foBbIpX//oDmo0SEJrL/5au6dGzrUD40tfXZBsECfmY+doxk/sICi13l2zY3Tp4SS4nUwHqJKYegL+gqpIKdgv8xjwWXW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"/>
    </svg>
    
  );
}

export default SvgSchedule

