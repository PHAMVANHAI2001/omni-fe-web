export const initFbsdk = () => {
    return new Promise(resolve => {
      window.fbAsyncInit = function() {
        FB.init({
          appId: '514618076579201',
          autoLogAppEvents: true,
          xfbml: true, // parse social plugins on this page
          version: 'v10.0' // use graph api version 2.8
        });
        // FB.AppEvents.logPageView();   
      };
      (function (d, script) {
        script = d.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0&appId=514618076579201&autoLogAppEvents=1`;
        d.getElementsByTagName('head')[0].appendChild(script);
    })(document);
    })
}