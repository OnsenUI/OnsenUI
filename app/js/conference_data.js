'use strict';

angular.module('myApp.services', [])
.factory('talkData', function() {  
	var talks = [
		{
			"talk_id": "t06",
			"title": "What's New in Android Developer Tool",
			"track": "Android",
			"time_slot_id": "06",
			"room": "Room 12",
			"hasDetail": true,
			"speakers": [{
					"name": "Xavier Ducrohet",
					"info": "Xavier joined Google in 2007 to work on Developer Tools for Android. He’s now the Tech Lead for the Android SDK and Tools team. His current focus is developing a brand new build system based on Gradle for Android app developers."
				}, {
					"name": "Tor Norbye",
					"info": "Tor Norbye is an engineer on the Android SDK team working on visual tools for Android development."
				}
			],
			"desc": "An in depth tour of the Android development tools, with a closer look at everything new - along with tips and tricks for getting the most out of them. For a more detailed look at one of the demos presented in this session, check out Brad Abram's overview 'Google I/O 2013 Demo: Android Studio + Cloud Endpoints – Synchronized StopWatch Demo' (http://bradabrams.com/2013/06/google-io-2013-demo-android-studio-cloud-endpoints-synchronized-stopwatch-demo/)."
		}, {
			"talk_id": "t07",
			"title": "Best Practices for Bluetooth Development",
			"track": "Android",
			"time_slot_id": "07",
			"room": "Room 5",
			"hasDetail": true,
			"speakers": [{
					"name": "Sara Sinclair Brody",
					"info": "Sara (Scout) is the Android Product Manager for wireless communications, power management, and text input. She joined Google in 2011, holds a Ph.D. in computer security, and is passionate about making Android ever-more-awesome for users and developers."
				}, {
					"name": "Rich Hyndman",
					"info": "Richard is a Senior Developer Advocate for Android at Google in the UK. He has enjoyed over 10 years in the mobile industry, including experience running a VC funded mobile start up, working for a large mobile operator and a few years consulting. With his J2ME and XHTML years behind him, Richard now supports Android developers bringing excellent apps to the Google Play Store"
				}, {
					"name": "Matthew Xie",
					"info": "Current: Tech lead of Android Bluetooth team in Google Working experience: Google, Qualcomm, NCSA at UIUC Education: Computer Science, UIUC"
				}
			],
			"desc": "Opinions on Bluetooth can divide a crowd, but the technology can connect them back together. This is an end-to-end session that gives a brief overview of core specifications and profiles before diving into Android Bluetooth support, best practices for development(with examples), and some features you may not be aware of."
		}, {
			"talk_id": "t08",
			"title": "Games Services in Practice",
			"track": "Android",
			"time_slot_id": "08",
			"room": "Room 5",
			"hasDetail": true,
			"speakers": [{
					"name": "Dan Galpin",
					"info": "Dan Galpin is a Developer Advocate for the Google Android team focused on Games. In his spare time, he does partner dancing and performs opera, operetta, and musical theater."
				}, {
					"name": "Jaewoong Jung",
					"info": "Jaewoong Jung is a software engineer working on the Android app developer experience. His passion lies in helping developers build exciting Android games."
				}, {
					"name": "Jennie Lees",
					"info": "Jennie is a product manager on the Android team whose sole joy in life is making developers happy."
				}
			],
			"desc": "Practical tips for game developers from insiders within the Android team, including how to work with the developer dashboard from the beginning of development through multiple releases."
		}, {
			"talk_id": "t09",
			"title": "Volley: Easy, Fast Networking for Android",
			"track": "Android",
			"time_slot_id": "09",
			"room": "Room 12",
			"hasDetail": true,
			"speakers": [{
					"name": "Ficus Kirkpatrick",
					"info": "Ficus was a founding member of the Android team, and currently leads the Google Play Store team."
				}
			],
			"desc": "Opinions on Bluetooth can divide a crowd, but the technology can connect them back together. This is an end-to-end session that gives a brief overview of core specifications and profiles before diving into Android Bluetooth support, best practices for development(with examples), and some features you may not be aware of."
		}, {
			"talk_id": "t10",
			"title": "Androids Do Daydream",
			"track": "Android",
			"time_slot_id": "10",
			"room": "Room 3",
			"hasDetail": true,
			"speakers": [{
					"name": "Daniel Sandler",
					"info": "Member of the Android team at Google."
				}
			],
			"desc": "With Daydream, new in Android 4.2, an idle or docked device becomes an opportunity for your app to delight the user. But where did this feature come from? Should your app support Daydream? How easy is it to add a Daydream? How can you make yours more fun and engaging? Answers to these questions—plus plenty of ideas and sample code—will be provided for daydreamers attending this session."
		}, {
			"talk_id": "t11",
			"title": "WebM and the New VP9 Open Video Codec",
			"track": "Chrome & Apps",
			"time_slot_id": "06",
			"room": "Room 4",
			"hasDetail": true,
			"speakers": [{
					"name": "Ronald Bultje",
					"info": "Ronald spends his daytime designing the VP9 video codec: beautiful, HD video quality, incredibly fast decode speed and great compression. In his spare time, he works on the FFmpeg opensource project."
				}, {
					"name": "Matt Frost",
					"info": "Matt Frost is a Senior Business Product Manager on the Chrome Web Media Team."
				}
			],
			"desc": "According to Cisco, video data will be 55 percent of all consumer Internet traffic by 2016. With that much data traversing networks, efficient video compression will be more important than ever, especially on mobile networks. We are very excited about the new VP9 codec, which delivers better video quality at lower data rates than competing technologies. Furthermore, VP9 was developed entirely in the open as a royalty-free technology. In this session you will learn how VP9 performs against H.264 and other other codecs in quality and decoding speed, how to create WebM videos with VP9 and the new Opus audio codec, and how to deploy VP9 content to Chrome users in HTML5 <video>."
		}, {
			"talk_id": "t12",
			"title": "Use Apps Script to Create Dynamic Google Forms",
			"track": "Chrome & Apps",
			"time_slot_id": "07",
			"room": "Room 7",
			"hasDetail": true,
			"speakers": [{
					"name": "Eric Koleda",
					"info": "I am a Developer Programs Engineer working primarily on Google Apps Script."
				}, {
					"name": "Matthew Ziegelbaum",
					"info": "Matt Ziegelbaum is a Software Engineer on Google Forms."
				}
			],
			"desc": " The updated version of Google Forms that launched earlier this year works with Apps Script, allowing you to create and manipulate forms with only a few lines of code. In this session, we'll explore ways to make forms and workflows more useful through scripts and demonstrate tricks that make forms react to changes in your organization."
		}, {
			"talk_id": "t13",
			"title": "Actions in the inbox, powered by schemas",
			"track": "Chrome & Apps",
			"time_slot_id": "08",
			"room": "Room 4",
			"hasDetail": true,
			"speakers": [{
					"name": "Claudio Cherubino",
					"info": "Claudio is an engineer in the Google Apps Developer Relations team. Prior to Google, he worked as software developer, technology evangelist, community manager, consultant, technical translator and has contributed to many open-source projects. His current interests include Google APIs, new technologies and good coffee."
				}, {
					"name": "Shalini Agarwal",
					"info": "Shalini is a Product Manager on the Gmail team. Prior to Gmail, she worked on Google Maps, Local Ads, SMB products, and TV Ads."
				}
			],
			"desc": "Does your service send emails? During this session we will show you how to add structured data to your emails to enable actions directly from the inbox and increase user engagement."
		}, {
			"talk_id": "t14",
			"title": "A Trip Down Memory Lane with Gmail and DevTools",
			"track": "Chrome & Apps",
			"time_slot_id": "09",
			"room": "Room 4",
			"hasDetail": true,
			"speakers": [{
					"name": "John McCutchan",
					"info": "John is a Developer Programs Engineer at Google. Since joining Google, John has worked on the Dart Virtual Machine adding support for SIMD computation. John is the inventor of inotify—the Linux kernel filesystem event notification system used in every Linux distribution and Android phone. He has an M.Sc. in Computer Science."
				}, {
					"name": "Loreena Lee",
					"info": "Loreena is a software engineer who spends most of her days focused on various aspects of Gmail performance."
				}
			],
			"desc": "Automatic garbage collection in JavaScript isn't a substitute for effective memory management, especially in large, long-running web apps. Memory leaks, frequent garbage collection pauses, and overall memory bloat can really drag you down. Come take a trip down memory lane with us and learn how we tackled these performance issues in Gmail. We'll share best practices for memory management and demonstrate how to use the Chrome DevTools Heap Profiler like a wizard to optimize your site."
		}, {
			"talk_id": "t15",
			"title": "The Chrome Packaged Apps State of the Nation",
			"track": "Chrome & Apps",
			"time_slot_id": "10",
			"room": "Room 6",
			"hasDetail": true,
			"speakers": [{
					"name": "Erik Kay",
					"info": "Erik is an Engineering Director at Google, and one of the earliest Chrome team members. He leads much of the Chrome Platform team, including Apps, Extensions, Native Client and Pepper."
				}
			],
			"desc": "Happy birthday Chrome Packaged Apps! Come help us celebrate by learning what's new in the Packaged Apps platform and what's ahead on the roadmap."
		}, {
			"talk_id": "t16",
			"title": "Cloud Platform Track Kickoff: Ushering in the Next Generation of Cloud Computing",
			"track": "Google Cloud Platform",
			"time_slot_id": "06",
			"room": "Room 2",
			"hasDetail": true,
			"speakers": [{
					"name": "Greg DeMichillie",
					"info": "Greg DeMichillie is a Director of Product Management for Google's Cloud Platform. Before joining Google, he worked on a variety of developer platforms at companies such Amazon, Adobe, and Microsoft."
				}, {
					"name": "Urs Hölzle",
					"info": "Urs Hölzle is Senior Vice President for Technical Infrastructure at Google. In this capacity he oversees the design, installation, and operation of the servers, networks, and datacenters that power Google's services. Through efficiency innovations, Urs and his team have reduced the energy used by Google data centers to less than 50% of the industry average. Urs is renowned for both his red socks and his free-range Leonberger, Yoshka (Google's first dog). Urs grew up in Switzerland and received a master's degree in computer science from ETH Zurich and, as a Fulbright scholar, a Ph.D. from Stanford. While at Stanford (and then a start-up later acquired by Sun Microsystems) he invented fundamental techniques used in most of today's leading Java compilers. Before joining Google he was a professor of computer science at the University of California, Santa Barbara. He is a Fellow of the ACM, a member of the Swiss Academy of Technical Sciences and the National Academy of Engineering, and serves on the board of the US World Wildlife Fund."
				}
			],
			"desc": "Senior Vice President Urs Hölzle will share Google’s vision for the next generation of cloud computing. He’ll discuss how investments in infrastructure, software and people will help usher in this new era for Google and developers around the world via the Google Cloud Platform. This session will also include announcements and demo important new features of the Platform."
		}, {
			"talk_id": "t17",
			"title": "Autoscaling Java",
			"track": "Google Cloud Platform",
			"time_slot_id": "07",
			"room": "Room 4",
			"hasDetail": true,
			"speakers": [{
					"name": "Matt Stephenson",
					"info": "Matt is a member of the Software Engineering team responsible for Google App Engine's Java Runtime. He has a long history of working on cloud technologies including Amazon's Apollo and AWS, OpenStack, and jclouds."
				}, {
					"name": "Ludovic Champenois",
					"info": "Software Engineer, Google"
				}
			],
			"desc": "Understand how to build Java applications that work well in an autoscaling environment. We'll discuss common anti-patterns in Java that make it difficult for autoscaling environments to deal with your application. We'll also discuss how App Engine knows when to scale up and back your application and how to take full advantage of this."
		}, {
			"talk_id": "t18",
			"title": "Importing Large Data Sets into Google Cloud Storage",
			"track": "Google Cloud Platform",
			"time_slot_id": "08",
			"room": "Room 8",
			"hasDetail": true,
			"speakers": [{
					"name": "Brian Dorsey",
					"info": "I'm a Developer Programs Engineer on the Google Developer Relations team. I help you build cool stuff with our APIs. I focus on our Cloud Platform, especially Compute Engine and Cloud Storage. I love Python and I've taught Python at the University of Washington & spoken at both PyCon US & PyCon Japan. I'm currently learning Go and enjoying it. 日本語も話せます。"
				}, {
					"name": "Dave Barth",
					"info": "Dave is the lead product manager for Google Cloud Storage."
				}
			],
			"desc": "This session will review multiple approaches customers take when importing their large data sets into Google Cloud Storage, including trade-offs in time, cost, and complexity. These solutions include several advanced techniques which will also help you in a wide range of other situations. We'll show the architecture and code for some of these approaches and feature a case study of a 5 PB+ migration."
		}, {
			"talk_id": "t19",
			"title": "What's New and Cool with Google Compute Engine",
			"track": "Google Cloud Platform",
			"time_slot_id": "09",
			"room": "Room 4",
			"hasDetail": true,
			"speakers": [{
					"name": "Martin Gannholm",
					"info": "Martin is an Engineering Manager on Google's Cloud Platform. He spends his days harnessing the diverse teams and technologies at Google to deliver the best infrastructure products for developers to build upon."
				}, {
					"name": "Navneet Joneja",
					"info": "Navneet Joneja is the Lead Product Manager for Google Compute Engine. Prior to joining Google in 2011, Navneet led cloud initiatives at Yahoo and Amazon."
				}
			],
			"desc": "Google Compute Engine's had a very busy year! We've made improvements to the underlying architecture to provide even better performance, released new versions of our APIs that improve the developer experience, and introduced many new features and instance types. Come join us as we guide you through what's new and cool with Google Compute Engine, and how recent improvements can help you build more efficient, scalable and cost-effective applications in the cloud."
		}, {
			"talk_id": "t20",
			"title": "Mobile, Web and Cloud - The Triple Crown of Modern Applications",
			"track": "Google Cloud Platform",
			"time_slot_id": "10",
			"room": "Room 4",
			"hasDetail": true,
			"speakers": [{
					"name": "Ido Green",
					"info": "Ido is a Developer Advocate for Google Chrome/HTML5/Chrome OS. He has been a developer and building companies for more than 18 years. He still likes to develop web applications, but only ones with amazing UX. He has a wide array of skills and experience, including HTML5, Java, dart, JavaScript--and all aspects of agile development and scaling systems.(*) New: my book 'Web Workers: Multithreaded Programs in JavaScript' is now available ;)P.S.http://www.linkedin.com/in/greenido"
				}, {
					"name": "Danny Hermes",
					"info": "Danny is a Developer Programs Engineer at Google working on the App Engine team. He is kind of a nut; a sports nut, a Python nut and a problem solving nut. Prior to Google, I worked at a healthcare startup in Silicon Valley and before that graduated from the University of Michigan with BS degrees in Mathematics and Economics (seriously, not BS-ing you). Born and bred a midwestern boy, I can't get enough California sunshine."
				}
			],
			"desc": "Ready to rock the world with your next application? Odds are you are thinking about mobile, web and the cloud. In this session we will walk through building a modern mobile web application that takes advantage of the Google Cloud Platform. Learn trips, best practices and solid architecture that will make your next mobile web app an amazing success."
		}

	];

	var service = {
		talks: talks
	};

	return service;
})


.factory('talkSlotData', function() {  
	var talkSlots = [
		{
			"talk_id": "",
			"title": "Slot 1"
		},
		{
			"talk_id": "",
			"title": "Slot 2"
		},
		{
			"talk_id": "",
			"title": "Slot 3"							
		}, 

	];

	var service = {
		talkSlots: talkSlots
	};

	return service;
});