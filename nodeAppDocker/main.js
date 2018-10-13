var http = require("http");

http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/html'});
   
   // Send the response body as "Hello World"
   var responseData = `<!doctype html> 
   <!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
   <!--[if IE 7 ]> <html lang="en" class="no-js ie7"> <![endif]-->
   <!--[if IE 8 ]> <html lang="en" class="no-js ie8"> <![endif]-->
   <!--[if IE 9 ]> <html lang="en" class="no-js ie9"> <![endif]-->
   <!--[if (gt IE 9)|!(IE)]><!--><html lang="en"><!--<![endif]-->
   <head>
   <meta charset="utf-8">
   <title>Node.js First Application</title>
   <meta name="description" content="Node.js First Application - Learn Node.js framework in simple and easy steps starting from basic to advanced concepts with examples including Introduction, Environment Setup, Node Package Manager, Node Callbacks Concept, Node Buffers Module, Node Streams, Node File System, Node Utility Modules, Node Web Module, Node Express Application, Node RESTFul API, Node Scaling Application." />
   <meta name="keywords" content="Node.js, Tutorial, Introduction, Environment Setup, Node Package Manager, Global vs Local Installation, Node Callbacks Concept, locking vs non-blocking Code, Event Driven Programming, Event Loop Overview, Event Emitters, Implementing Callbacks, Node Buffers Module,JSON to JS Objects, JS Objects to JSON, Buffer Objects, Node Streams, Reading Stream, Writing Stream, Piping Stream, Node File System, File System Module, Synchronous vs Asynchronous Node, Utility Modules,Node Console Module, Node Process Module, Node OS Module, Node Path Module, Node Net Module, Node DNS Module, Node Domain Module, Node Web Module,HTTP Servers with Node.js, HTTP Clients with Node.js, Node Express Application, Express Overview, Installing Express, Express Generator, Node RESTFul API, Node Scaling Application,The exec function,The spawn function,The fork function." />
   <base href="https://www.tutorialspoint.com/" />
   <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
   <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=yes">
   <meta property="og:locale" content="en_US" />
   <meta property="og:type" content="website" />
   <meta property="fb:app_id" content="471319149685276" />
   <meta property="og:site_name" content="www.tutorialspoint.com" />
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="apple-mobile-web-app-status-bar-style" content="black">
   <meta name="author" content="tutorialspoint.com">
   <script type="text/javascript" src="https://www.tutorialspoint.com/theme/js/script-min-v4.js?v=2"></script>
   <link rel="stylesheet" href="https://www.tutorialspoint.com/theme/css/style-min.css?v=3">
   <script>
   function openNav() {	
     document.getElementById("mySidenav").style.width = "250px";
     document.getElementById("right_obs").style.display = "block";
   }
   function closeNav() {
     document.getElementById("mySidenav").style.width = "0";
     document.getElementById("right_obs").style.display = "none";
   }
   function close_obs_sidenav(){
     document.getElementById("mySidenav").style.width = "0";
     document.getElementById("right_obs").style.display = "none";
   }
   </script>
   <!-- Head Libs -->
   <!--[if IE 8]>
   <link rel="stylesheet" type="text/css" href="/theme/css/ie8.css">
   <![endif]-->
   <style>
   pre.prettyprint.tryit {min-height:37px; background: #eee url(/nodejs/images/try-it.jpg) top right no-repeat !important}select{ border:0 !important; outline: 1px inset black !important; outline-offset: -1px !important; }
   .btnsbmt{ background: #82af25 !important;}
   ul.nav-list.primary>li a.videolink{    background: none; margin: 0px; padding: 0px; border: 1px solid #d6d6d6;}
   div.feature-box div.feature-box-icon, .col-md-3 .course-box, li.heading, div.footer-copyright { background: #82af25 url(/images/pattern.png) repeat center center !important;}
   .sub-main-menu .sub-menuu div:hover, .sub-main-menu .viewall, header nav ul.nav-main li a:hover, button.btn-responsive-nav, header div.search button.btn-default { background: #82af25 !important;}
   .submenu-item{ border-bottom: 2px solid #82af25 !important; border-top: 2px solid #82af25 !important }
   .ace_scroller{overflow: auto!important;}
   a.demo{font-family: "Open Sans",Arial,sans-serif; background:#82af25; color:#fff; font-size:13px; padding:3px 10px; border:1px solid #d6d6d6; position:absolute; right:5px; margin:-6px 17px 0px 0px;}
   a.demo:hover{opacity:.8}
   </style>
   <script>
   $(document).ready(function() {
     $('input[name="q"]').keydown(function(event){
       if(event.keyCode == 13) {
         event.preventDefault();
         return false;
       }
     });
   });
   </script>
   </head>
   <body onload="prettyPrint()">
   <div class="wrapLoader">
      <div class="imgLoader">
         <img  src="/images/loading-cg.gif" alt="" width="70" height="70" />
      </div>
   </div>
   <div id="right_obs" class="display-none" onclick="close_obs_sidenav()"></div>
   <header>
      <div class="container">			
         <h1 class="logo">
         <a href="index.htm" title="tutorialspoint">
         <img alt="tutorialspoint" src="/nodejs/images/logo.png">
         </a>
         </h1>			
         <ul class="tp-inline-block pull-right" id="tp-head-icons">
           <li>
              <div class="tp-second-nav tp-display-none tp-pointer" onclick="openNav()">
                 <i class="fa fa-th-large fa-lg"></i>
              </div>
           </li>
        </ul>
        <button class="btn btn-responsive-nav btn-inverse" data-toggle="collapse" data-target=".nav-main-collapse" id="pull" style="top: 24px!important"> <i class="icon icon-bars"></i> </button>
         <nav>
            <ul class="nav nav-pills nav-top">
               <li><a href="/about/about_careers.htm" style="background: #fffb09; font-weight: bold;"><i class="icon icon-suitcase"></i> Jobs</a></li>
               <li> <a target="_blank" href="/programming_examples/"><i class="fa fa-cubes"></i> &nbsp;Examples</a> </li>
               <li> <a href="https://www.tutorialspoint.com/whiteboard.htm"><img src="theme/css/icons/image-editor.png" alt="Whiteboard" title="Whiteboard"> &nbsp;Whiteboard</a> </li>
               <li> <a href="https://www.tutorialspoint.com/netmeeting.php"><i class="fa-camera"></i> &nbsp;Net Meeting</a> </li>
               <li> <a href="/online_dev_tools.htm"> <i class="dev-tools-menu" style="opacity:.5"></i> Tools </a> </li>
               <li> <a href="/articles/index.php"><i class="icon icon-file-text-o"></i> &nbsp;Articles</a> </li>            
               <li class="top-icons">
                 <ul class="social-icons">
                 <li class="facebook"><a href="https://www.facebook.com/tutorialspointindia" target="_blank" rel="nofollow" data-placement="bottom" title="tutorialspoint @ Facebook">Facebook</a></li>
                 <li class="googleplus"><a href="https://plus.google.com/u/0/116678774017490391259/posts" target="_blank" rel="nofollow" data-placement="bottom" title="tutorialspoint @ Google+">Google+</a></li>
                 <li class="twitter"><a href="https://www.twitter.com/tutorialspoint" target="_blank" rel="nofollow" data-placement="bottom" title="tutorialspoint @ Twitter">Twitter</a></li>
                 <li class="linkedin"><a href="https://www.linkedin.com/company/tutorialspoint" target="_blank" rel="nofollow" data-placement="bottom" title="tutorialspoint @ Linkedin">Linkedin</a></li>
                 <li class="youtube"><a href="https://www.youtube.com/channel/UCVLbzhxVTiTLiVKeGV7WEBg" target="_blank" rel="nofollow" data-placement="bottom" title="tutorialspoint YouTube">YouTube</a></li>
                 </ul>
              </li>
            </ul>
         </nav>
       </div>
        <div class="sidenav" id="mySidenav">
        <div class="navbar nav-main">
         <div class="container">
            <nav class="nav-main mega-menu">
               <ul class="nav nav-pills nav-main" id="mainMenu">
                  <li class="dropdown no-sub-menu"> <a class="dropdown" href="index.htm"><i class="icon icon-home"></i> Home</a> </li>   
                  <li class="dropdown no-sub-menu"><a class="dropdown" href="/questions/index.php"><i class="fa fa-send"></i> Q/A </a> </li>
                  <li class="dropdown"><a class="dropdown" href="tutorialslibrary.htm"><span class="tut-lib"> Library </span></a></li>
                  <li class="dropdown no-sub-menu"><a class="dropdown" href="videotutorials/index.htm"><i class="fa-toggle-right"></i> Videos </a></li>
                  <li class="dropdown no-sub-menu"><a class="dropdown" href="tutor_connect/index.php"><i class="fa-user"> </i> Tutors</a></li>
                  <li class="dropdown no-sub-menu"><a class="dropdown" href="codingground.htm"><i class="fa-code"></i> Coding Ground </a> </li>
                  <li class="dropdown no-sub-menu"><a class="dropdown" href="https://store.tutorialspoint.com/"><i class="fa-usd"></i> Store </a> </li>
                  <li class="dropdown no-sub-menu">
                     <div class="searchform-popup">
                        <input class="header-search-box" type="text" id="search-string" name="q" placeholder="Search your favorite tutorials..." onfocus="if (this.value == 'Search your favorite tutorials...') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Search your favorite tutorials...';}" autocomplete="off">
                        <div class="magnifying-glass"><i class="icon-search"></i> Search </div>
                    </div>
                  </li>
               </ul>
            </nav>
           </div>
         </div>	
        </div>	
      </div>	
   </header>
   <div style="clear:both;"></div>
   <div role="main" class="main">
   <div class="container">
   <div class="row">
   <div class="col-md-2">
   <aside class="sidebar">
   <div class="mini-logo">
   <img src="/nodejs/images/nodejs-mini-logo.jpg" alt="Node.js Tutorial" />
   </div>
   <ul class="nav nav-list primary left-menu" >
   <li><a class="videolink" href="/nodejs_online_training/index.asp" target="_blank"><img src="/nodejs/images/nodejs-video-tutorials.jpg" alt="Node.js Video Tutorials" /></a></li>
   </ul>
   <ul class="nav nav-list primary left-menu">
   <li class="heading">Node.js Tutorial</li>
   <li><a href="/nodejs/index.htm">Node.js - Home</a></li>
   <li><a href="/nodejs/nodejs_introduction.htm">Node.js - Introduction</a></li>
   <li><a href="/nodejs/nodejs_environment_setup.htm">Node.js - Environment Setup</a></li>
   <li><a href="/nodejs/nodejs_first_application.htm">Node.js - First Application</a></li>
   <li><a href="/nodejs/nodejs_repl_terminal.htm">Node.js - REPL Terminal</a></li>
   <li><a href="/nodejs/nodejs_npm.htm">Node.js - Package Manager (NPM)</a></li>
   <li><a href="/nodejs/nodejs_callbacks_concept.htm">Node.js - Callbacks Concept</a></li>
   <li><a href="/nodejs/nodejs_event_loop.htm">Node.js - Event Loop</a></li>
   <li><a href="/nodejs/nodejs_event_emitter.htm">Node.js - Event Emitter</a></li>
   <li><a href="/nodejs/nodejs_buffers.htm">Node.js - Buffers</a></li>
   <li><a href="/nodejs/nodejs_streams.htm">Node.js - Streams</a></li>
   <li><a href="/nodejs/nodejs_file_system.htm">Node.js - File System</a></li>
   <li><a href="/nodejs/nodejs_global_objects.htm">Node.js - Global Objects</a></li>
   <li><a href="/nodejs/nodejs_utility_module.htm">Node.js - Utility Modules</a></li>
   <li><a href="/nodejs/nodejs_web_module.htm">Node.js - Web Module</a></li>
   <li><a href="/nodejs/nodejs_express_framework.htm">Node.js - Express Framework</a></li>
   <li><a href="/nodejs/nodejs_restful_api.htm">Node.js - RESTFul API</a></li>
   <li><a href="/nodejs/nodejs_scaling_application.htm">Node.js - Scaling Application</a></li>
   <li><a href="/nodejs/nodejs_packaging.htm">Node.js - Packaging</a></li>
   <li class="heading">Node.js Useful Resources</li>
   <li><a href="/nodejs/nodejs_quick_guide.htm">Node.js - Quick Guide</a></li>
   <li><a href="/nodejs/nodejs_useful_resources.htm">Node.js - Useful Resources</a></li>
   <li><a href="/nodejs/nodejs_discussion.htm">Node.js - Dicussion</a></li>
   </ul>
   <ul class="nav nav-list primary push-bottom left-menu special">
   <li class="sreading">Selected Reading</li>
   <li><a target="_top" href="/upsc_ias_exams.htm">UPSC IAS Exams Notes</a></li>
   <li><a target="_top" href="/developers_best_practices/index.htm">Developer's Best Practices</a></li>
   <li><a target="_top" href="/questions_and_answers.htm">Questions and Answers</a></li>
   <li><a target="_top" href="/effective_resume_writing.htm">Effective Resume Writing</a></li>
   <li><a target="_top" href="/hr_interview_questions/index.htm">HR Interview Questions</a></li>
   <li><a target="_top" href="/computer_glossary.htm">Computer Glossary</a></li>
   <li><a target="_top" href="/computer_whoiswho.htm">Who is Who</a></li>
   </ul>
    </aside>
   </div>
   <!-- PRINTING STARTS HERE -->
   <div class="row">
   <div class="content">
   <div class="col-md-7 middle-col">
   <h1>Node.js - First Application</h1>
   <hr />
   <div style="padding-bottom:5px;padding-left:10px;text-align: center;">Advertisements</div>
   <div style="text-align: center;">
   <script type="text/javascript"><!--
   google_ad_client = "pub-7133395778201029";
   google_ad_width = 468;
   google_ad_height = 60;
   google_ad_format = "468x60_as";
   google_ad_type = "image";
   google_ad_channel = "";
   //--></script>
   <script type="text/javascript"
   src="https://pagead2.googlesyndication.com/pagead/show_ads.js"> 
   </script>
   </div>
   <hr />
   <div class="pre-btn">
   <a href="/nodejs/nodejs_environment_setup.htm"><i class="icon icon-arrow-circle-o-left big-font"></i> Previous Page</a>
   </div>
   <div class="nxt-btn">
   <a href="/nodejs/nodejs_repl_terminal.htm">Next Page <i class="icon icon-arrow-circle-o-right big-font"></i>&nbsp;</a>
   </div>
   <div class="clearer"></div>
   <hr />
   <p>Before creating an actual "Hello, World!" application using Node.js, let us see the components of a Node.js application. A Node.js application consists of the following three important components &minus;</p>
   <ul class="list">
   <li><p><b>Import required modules</b> &minus; We use the <b>require</b> directive to load Node.js modules.</p></li>
   <li><p><b>Create server</b> &minus; A server which will listen to client's requests similar to Apache HTTP Server.</p></li>
   <li><p><b>Read request and return response</b> &minus; The server created in an earlier step will read the HTTP request made by the client which can be a browser or a console and return the response.</p></li>
   </ul>
   <h2>Creating Node.js Application</h2>
   <h3>Step 1 - Import Required Module</h3>
   <p>We use the <b>require</b> directive to load the http module and store the returned HTTP instance into an http variable as follows &minus;</p>
   <pre class="result notranslate">
   var http = require("http");
   </pre>
   <h3>Step 2 - Create Server</h3>
   <p>We use the created http instance and call <b>http.createServer()</b> method to create a server instance and then we bind it at port 8081 using the <b>listen</b> method associated with the server instance. Pass it a function with parameters request and response. Write the sample implementation to always return "Hello World".</p>
   <pre class="prettyprint notranslate">
   http.createServer(function (request, response) {
      // Send the HTTP header 
      // HTTP Status: 200 : OK
      // Content Type: text/plain
      response.writeHead(200, {'Content-Type': 'text/plain'});
      
      // Send the response body as "Hello World"
      response.end('Hello World\n');
   }).listen(8081);
   
   // Console will print the message
   console.log('Server running at http://127.0.0.1:3456/');
   </pre>
   <p>The above code is enough to create an HTTP server which listens, i.e., waits for a request over 8081 port on the local machine.</p>
   <p style="page-break-after:always">
   </p>
   <h3>Step 3 - Testing Request &amp; Response</h3>
   <p>Let's put step 1 and 2 together in a file called <b>main.js</b> and start our HTTP server as shown below &minus;</p>
   <pre class="prettyprint notranslate">
   var http = require("http");
   
   http.createServer(function (request, response) {
   
      // Send the HTTP header 
      // HTTP Status: 200 : OK
      // Content Type: text/plain
      response.writeHead(200, {'Content-Type': 'text/plain'});
      
      // Send the response body as "Hello World"
      response.end('Hello World\n');
   }).listen(8081);
   
   // Console will print the message
   console.log('Server running at http://127.0.0.1:8081/');
   </pre>
   <p>Now execute the main.js to start the server as follows &minus;</p>
   <pre class="prettyprint notranslate">
   $ node main.js
   </pre>
   <p>Verify the Output. Server has started.</p>
   <pre class="result notranslate">
   Server running at http://127.0.0.1:8081/
   </pre>
   <h2>Make a Request to the Node.js Server</h2>
   <p>Open http://127.0.0.1:8081/ in any browser and observe the following result.</p>
   <img src="/nodejs/images/nodejs_sample.jpg" alt="Node.js Sample"/>
   <p>Congratulations, you have your first HTTP server up and running which is responding to all the HTTP requests at port 8081.</p>
   <hr />
   <div class="pre-btn">
   <a href="/nodejs/nodejs_environment_setup.htm"><i class="icon icon-arrow-circle-o-left big-font"></i> Previous Page</a>
   </div>
   <div class="print-btn center">
   <a href="/cgi-bin/printpage.cgi" target="_blank"><i class="icon icon-print big-font"></i> Print</a>
   </div>
   <div class="nxt-btn">
   <a href="/nodejs/nodejs_repl_terminal.htm">Next Page <i class="icon icon-arrow-circle-o-right big-font"></i>&nbsp;</a>
   </div>
   <hr />
   <!-- PRINTING ENDS HERE -->
   <div class="bottomgooglead">
   <div class="bottomadtag">Advertisements</div>
   <script><!--
   var width = 580;
   var height = 400;
   var format = "580x400_as";
   if( window.innerWidth < 468 ){
      width = 300;
      height = 250;
      format = "300x250_as";
   }
   google_ad_client = "pub-7133395778201029";
   google_ad_width = width;
   google_ad_height = height;
   google_ad_format = format;
   google_ad_type = "image";
   google_ad_channel ="";
   //--></script>
   <script src="https://pagead2.googlesyndication.com/pagead/show_ads.js">
   </script>
   </div>
   </div>
   </div>
   <div class="row">
   <div class="col-md-3" id="rightbar">
   <div class="simple-ad">
   <a href="javascript:void(0)" onclick="var sTop = window.screen.height/2-(218); var sLeft = window.screen.width/2-(313);window.open('https://www.facebook.com/sharer.php?u=' + 'https://www.tutorialspoint.com/nodejs/nodejs_first_application.htm','sharer','toolbar=0,status=0,width=626,height=456,top='+sTop+',left='+sLeft);return false;">
   <img src="/images/facebookIcon.jpg" alt="img" />
   </a>
   <a  href="javascript:void(0)" onclick="var sTop = window.screen.height/2-(218); var sLeft = window.screen.width/2-(313);window.open('https://twitter.com/share?url=' + 'https://www.tutorialspoint.com/nodejs/nodejs_first_application.htm','sharer','toolbar=0,status=0,width=626,height=456,top='+sTop+',left='+sLeft);return false;">
   <img src="/images/twitterIcon.jpg" alt="img" />
   </a>
   <a  href="javascript:void(0)" onclick="var sTop = window.screen.height/2-(218); var sLeft = window.screen.width/2-(313);window.open('https://www.linkedin.com/cws/share?url=' + 'https://www.tutorialspoint.com/nodejs/nodejs_first_application.htm&amp;title='+ document.title,'sharer','toolbar=0,status=0,width=626,height=456,top='+sTop+',left='+sLeft);return false;">
   <img src="/images/linkedinIcon.jpg" alt="img" />
   </a>
   <a  href="javascript:void(0)" onclick="var sTop = window.screen.height/2-(218); var sLeft = window.screen.width/2-(313);window.open('https://plus.google.com/share?url=https://www.tutorialspoint.com/nodejs/nodejs_first_application.htm','sharer','toolbar=0,status=0,width=626,height=456,top='+sTop+',left='+sLeft);return false;">
   <img src="/images/googlePlusIcon.jpg" alt="img" />
   </a>
   <a  href="javascript:void(0)" onclick="var sTop = window.screen.height/2-(218); var sLeft = window.screen.width/2-(313);window.open('https://www.stumbleupon.com/submit?url=https://www.tutorialspoint.com/nodejs/nodejs_first_application.htm&amp;title='+ document.title,'sharer','toolbar=0,status=0,width=626,height=456,top='+sTop+',left='+sLeft);return false;">
   <img src="/images/StumbleUponIcon.jpg" alt="img" />
   </a>
   <a  href="javascript:void(0)" onclick="var sTop = window.screen.height/2-(218); var sLeft = window.screen.width/2-(313);window.open('https://reddit.com/submit?url=https://www.tutorialspoint.com/nodejs/nodejs_first_application.htm&amp;title='+ document.title,'sharer','toolbar=0,status=0,width=626,height=656,top='+sTop+',left='+sLeft);return false;">
   <img src="/images/reddit.jpg" alt="img" />
   </a>
   </div>
   <div class="rightgooglead">
   <script><!--
   google_ad_client = "pub-7133395778201029";
   google_ad_width = 300;
   google_ad_height = 250;
   google_ad_format = "300x250_as";
   google_ad_type = "image";
   google_ad_channel ="";
   //--></script>
   <script src="https://pagead2.googlesyndication.com/pagead/show_ads.js">
   </script>
   </div>
   <div class="rightgooglead">
   <script><!--
   google_ad_client = "pub-7133395778201029";
   google_ad_width = 300;
   google_ad_height = 600;
   google_ad_format = "300x600_as";
   google_ad_type = "image";
   google_ad_channel ="";
   //--></script>
   <script src="https://pagead2.googlesyndication.com/pagead/show_ads.js">
   </script>
   </div>
   <div class="rightgooglead">
   <script><!--
   google_ad_client = "ca-pub-2537027957187252";
   /* Right Side Ad */
   google_ad_slot = "right_side_ad";
   google_ad_width = 300;
   google_ad_height = 250;
   //-->
   </script>
   <script src="https://pagead2.googlesyndication.com/pagead/show_ads.js">
   </script>
   </div>
   </div>
   </div>
   </div>
   </div>
   </div>
   
   <div class="footer-copyright">
   <div class="container">
   <div class="row">
   <div class="col-md-1">
   <a href="index.htm" class="logo"> <img alt="Tutorials Point" class="img-responsive" src="/scripts/img/logo-footer.png"> </a>
   </div>
   <div class="col-md-4 col-sm-12 col-xs-12">
      <nav id="sub-menu">
         <ul>
            <li><a href="/about/faq.htm">FAQ's</a></li>
            <li><a href="/about/about_privacy.htm#cookies">Cookies Policy</a></li>
            <li><a href="/about/contact_us.htm">Contact</a></li>
         </ul>
      </nav>
   </div>
   <div class="col-md-3 col-sm-12 col-xs-12">
   <p>&copy; Copyright 2018. All Rights Reserved.</p>
   </div>
   <div class="col-md-4 col-sm-12 col-xs-12">
      <div class="news-group">
         <input type="text" class="form-control-foot search" name="textemail" id="textemail" autocomplete="off" placeholder="Enter email for newsletter" onfocus="if (this.value == 'Enter email for newsletter...') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Enter email for newsletter...';}">
         <span class="input-group-btn"> <button class="btn btn-default btn-footer" id="btnemail" type="submit" onclick="javascript:void(0);">go</button> </span>
         <div id="newsresponse"></div>
      </div>
   </div>
   </div>
   </div>
   </div>
   </div>
   <!-- Libs -->
   <script src="/theme/js/custom-min.js?v=7"></script>
   <script src="https://www.google-analytics.com/urchin.js">
   </script>
   <script>
   _uacct = "UA-232293-6";
   urchinTracker();
   $('.pg-icon').click(function(){
      $('.wrapLoader').show();
   });
   </script>
   <script src="/theme/js/jquery.colorbox-min.js"></script>
   <script>
      var tryit = new $.TryIt('/nodejs/try_nodejs.php');
      tryit.compile();
   </script></div>
   </body>
   </html>
   `
   response.end(responseData);
}).listen(3456);

// Console will print the message
console.log('Server running at http://127.0.0.1:3456/');
