---


---

<h1 id="contents">Contents</h1>
<ul>
<li>About</li>
<li>Prerequisites</li>
<li>Getting Started</li>
<li>Development Builds</li>
</ul>
<h1 id="about">About</h1>
<p>The Juntos Platform was developed with React Native, Redux, NodeJS, MongoDB with the goal to help cash strapped non-profits by developing a framework to allow rapid development of a native application. To achieve this goal the project is primarily focused on developing features that are common across the non-profit industry, that allow user to congregate and collaborate.</p>
<p>Try the demo app, the Juntos Platform is live on both the iOS App store and Android Play Store if you would like to try the features of the latest release:</p>
<p><a href="https://www.juntosplatform.org/#download"><code>https://www.juntosplatform.org/#download</code></a></p>
<h1 id="prerequisites">Prerequisites</h1>
<p>The prerequisite are a set of instructions that are required before being able to run the Juntos Platform on Mobile(iOS and Android). The instructions facilitate the development environment set up process, by providing detailed instructions for Mac.</p>
<p>The following outlines the prerequisites process:</p>
<ul>
<li>Android
<ul>
<li>Command Line Tools</li>
<li>Environment Variables for Mac</li>
<li>Accept License Agreements</li>
</ul>
</li>
<li>iOS
<ul>
<li>Xcode</li>
<li>Developer Account Setup</li>
<li>iOS Simulator Configuration</li>
</ul>
</li>
<li>Node.js</li>
<li>MongoDB
<ul>
<li>Installing MongoDB</li>
<li>Running MongoDB</li>
<li>Import Data</li>
</ul>
</li>
</ul>
<p><strong>NOTE!!!:</strong> Currently, we only support development on Mac. We do have planned Windows support for the future, please check back for updates.</p>
<h2 id="android">Android</h2>
<p><strong>Command Line Tools</strong></p>
<p>The Android SDK is required by React Native as the build tool to generate a binary known as an APK(Similar to a .exe or .dmg), it also host a variety of tools that allow for the installing, debugging, and monitoring of your application.</p>
<ol>
<li>To get started with the Android SDK you will need to download the command line tools from the Android Developer website, please use the following link:</li>
</ol>
<blockquote>
<p><a href="https://developer.android.com/studio/index.html">https://developer.android.com/studio/index.html</a></p>
</blockquote>
<ol start="2">
<li>
<p>Once you have downloaded the command line tools, create a folder named <code>android_sdk</code> in your home directory:</p>
<p><code>mkdir android_sdk</code></p>
<p>Please make note of the install directory since it will be used to setup the environment variables.</p>
</li>
<li>
<p>Extract the command line tools to the <code>android_sdk</code> folder from the step above.</p>
</li>
</ol>
<p><strong>NOTE:</strong> When visiting the Android Developer website, the link to download the command line tools is not evident. You must click the “Download Options” link, this will redirect you to the “Select a different platform” section of the page, if you continue to scroll downward you will come across the “Get just the command line tools” section. Here is where you select the the platform for which you wish to install the Command Line tools.</p>
<p><strong>Environment Variables</strong></p>
<p>The Android development environment requires a few additions to your .bash_profile. This will allow React Native and your command line direct access to many of the useful commands like; android, emulator, and adb which allow you to manage SDK packages, configure emulators, and the capability to build, install, and run APK packages.</p>
<ol>
<li>
<p>Locate the file .bash_profile(This file will be located in your home directory) and open it up with your favorite text editor. If the .bash_profile does not exist in your home directory you can create it with the following command:</p>
<p><code>touch .bash_profile</code></p>
</li>
<li>
<p>Once you have your .bash_profile open, please insert the following exports to the end of your file. Please be sure to replace the <em>directory</em> tag, with the path to your <code>android_sdk</code> folder:</p>
</li>
</ol>
<blockquote>
<pre><code>export ANDROID_SDK_ROOT=&lt;directory&gt;/android_sdk
export ANDROID_HOME=$ANDROID_SDK_ROOT
export PATH=$ANDROID_SDK_ROOT:$PATH
export PATH=$ANDROID_SDK_ROOT/build-tools:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/tools/bin:$PATH
</code></pre>
</blockquote>
<p><strong>Note:</strong> The exports above include a few directories that do not exist. These directories will be created once you have finished the process detailed in the “Download Android Platform-Tools v23.0.0 &amp; Build Tools  v23.0.1” section of the readme.</p>
<ol start="3">
<li>Once you have added the exports from above, save and and close your file.</li>
<li>To complete the environment set up, the .bash_profile must be reset for the terminal to include the Android SDK commands. To do so, run the following terminal command in the directory of your .bash_profile:</li>
</ol>
<blockquote>
<p>source ~/.bash_profile</p>
</blockquote>
<p><strong>Accept License Agreements</strong></p>
<p>We need to accept the Android SDK license agreements, before we are allowed to build for Android. So lets go ahead and do that, by running the following command:</p>
<p><code>yes | sudo sdkmanager --licenses</code></p>
<h2 id="ios">iOS</h2>
<p>The following will cover the installation of Xcode, developer account setup and iOS simulator configuration.</p>
<p><strong>Note:</strong> iOS requires a that you join the Apple Developer program to be enable you to sign and ship your applications. There is a an annual fee of $100 USD, if your not a member you can join via the link below:</p>
<blockquote>
<p><a href="https://developer.apple.com/programs/">https://developer.apple.com/programs/</a></p>
</blockquote>
<p><strong>Xcode</strong></p>
<p>Juntos requires Xcode to build and install to iOS. Xcode can be downloaded via the Mac App Store, a quick search will turn up an icon similar to the image shown below. Once downloaded open Xcode via the Applications folder.</p>
<p><img src="https://i.imgur.com/ZxKoN02.png" alt="enter image description here"></p>
<p><strong>Developer Account Setup</strong></p>
<p>Xcode requires that you have an Apple Developer account to sign and ship your apps for both development and production. The following steps outline adding an account to Xcode:</p>
<ol>
<li>Navigate to <code>Xcode-&gt;Preferences-&gt;Accounts</code>.</li>
<li>Click the <code>+</code> in the bottom right hand corner of the Accounts window.</li>
<li>Xcode will prompt for you Apple Developer Program credentials.</li>
<li>Fill the fields with your credentials and click the <code>Sign In</code> button.</li>
</ol>
<p><strong>iOS Simulator Configuration</strong></p>
<p>Xcode provides a number of Simulators from iOS 9 to the latest iOS 11. For Juntos we will setup the iOS 11 Simulator. In the future if you wish to install a different simulator these instructions can be applied to any of the versions.</p>
<ol>
<li>Navigate to <code>Xcode-&gt;Preferences-&gt;Components</code></li>
<li>Click the download arrow to to the left of the <code>iOS 11.0 Simulator</code> as shown in the image bellow. This will begin the download.<br>
<img src="https://i.imgur.com/0yjhqJc.png" alt="enter image description here"></li>
<li>Once simulator has finished downloading Xcode can be closed.</li>
</ol>
<p>We will revisit Xcode when it comes time to create a production build. Now that you have completed the Xcode configurations, React Native will handle the process of building, installing and launching your simulator for iOS development builds.</p>
<h2 id="node.js">Node.js</h2>
<p>NodeJS is a Javascript runtime that has been built on top of Google’s V8 Javascript engine. And is utilized in the Juntos-Backend with ExpressJS to develop Restful API’s which handle the storage of user, and project data for the Juntos Platform. The latest version of Node.js now includes NPM a great tool for managing Node modules,  NPM will be used extensively in the “Getting Started” section to get both the Mobile and Backend up and running.</p>
<p>Here we will be using <code>brew</code> to get Node.js installed.</p>
<ol>
<li>
<p>First we need to install brew</p>
<p><code>/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"</code></p>
</li>
<li>
<p>Next, run brew update</p>
<p><code>brew update</code></p>
</li>
<li>
<p>Now we can install Node</p>
<p><code>brew install node</code></p>
</li>
</ol>
<p>To verify that node has been installed run node in the command line this will pull up the node.js command line interface and can be utilized as a JavaScript interpreter.</p>
<pre><code>node
</code></pre>
<p>Give it a try, type in <code>i=3</code> and then <code>console.log(i+3)</code>. You can also verify npm by running the command <code>npm</code>, this will display a list of available parameters and commands that can be used for node package management.</p>
<h2 id="mongodb">MongoDB</h2>
<p>MongoDB is a document-oriented database used as the primary storage for the Juntos Platform. MongoDB interacts with NodeJS and ExpressJS to save and retrieve data for the Mobile client. The following will guide you through the steps of installing MongoDB, running MongoDB, and importing test data.</p>
<p><strong>Installing MongoDB</strong></p>
<ol>
<li>
<p>To install MongoDB we run the following brew command</p>
<p><code>brew install mongodb</code></p>
</li>
<li>
<p>Once MongoDB has finished installing you must  now create the /data/db directory. This is where the mongo data will live.</p>
<p><code>sudo mkdir /data</code><br>
<code>sudo mkdir /data/db</code></p>
</li>
<li>
<p>We must make sure that the directory has the right permissions. You want to grant it full read and write permissions.</p>
<p><code>sudo chmod 777 /data/db</code></p>
</li>
</ol>
<p><strong>Running MongoDB</strong></p>
<p>We can now run mongoDB via the command line, we also want to make sure that it runs as a background process.</p>
<pre><code>sudo mongod &amp;
</code></pre>
<p>The ampersand tells the system that we want MongoDB running as a background process, until we manually kill the process or the system is restarted.</p>
<p><strong>Importing Test Data</strong></p>
<p>Provided is some test data to populate the Mongo database. This is the same data that is found in the demo application. But if you wish to create your own data via the Mobile client you may skip this step.</p>
<p>First you will need to download the test data from the following link:</p>
<blockquote>
<p><a href="https://www.juntosplatform.org/juntos_test_data.zip">https://www.juntosplatform.org/juntos_test_data.zip</a></p>
</blockquote>
<p>juntos_test_data.zip contains a single folder /juntos this is the folder that will be fed to mongorestore to populate mongo with the test data.</p>
<pre><code>mongorestore --db juntos /juntos
</code></pre>
<h1 id="getting-started">Getting Started</h1>
<p>Now that you have your development environment setup, your ready to get the Juntos Platform up and running.</p>
<h2 id="juntos-backend">Juntos Backend</h2>
<p><strong>Pulling Juntos Backend</strong></p>
<p>To get the latest feature and updates for the Juntos Backend it is recommended that you clone from master with the following:</p>
<pre><code>git clone https://github.com/CheCm19/Juntos-Backend.git
</code></pre>
<p><strong>Installing Node Modules</strong></p>
<p>Once you have pulled the backend to your local directory you will have to install all the node module dependencies with the following:</p>
<pre><code>npm install
</code></pre>
<p><strong>Starting up Juntos backend</strong></p>
<p>To start the back-end run the following command:</p>
<pre><code>npm start
</code></pre>
<h2 id="juntos-mobile">Juntos Mobile</h2>
<p><strong>Pulling Juntos Mobile</strong></p>
<p>To get the latest feature and updates for Juntos Mobile it is recommended that you clone from master with the following:</p>
<pre><code>git clone https://github.com/CheCm19/Juntos-Mobile.git
</code></pre>
<p><strong>Installing Node Modules</strong></p>
<p>Once you have pulled the Mobile client to your local directory you will have to install all the node module dependencies with the following:</p>
<pre><code>npm install
</code></pre>
<h1 id="development-builds">Development Builds</h1>
<p><strong>iOS Development Builds</strong></p>
<p>Execute the following command to build and install to the iOS simulator:</p>
<pre><code>react-native run-ios
</code></pre>
<p><strong>Android Development Builds</strong></p>
<p>Execute the following command to build and install to an android device:</p>
<pre><code>  react-native run-android
</code></pre>
<p><strong>Note:</strong> At the time of writing this document there are issues connecting to the system_image repositories which is required to setup the Android emulator. So for the moment we recommended that you use an Android device for testing development builds</p>

