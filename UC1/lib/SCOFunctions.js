/********************************************************************* **********
**
** Filename: SCOFunctions.js
**
** File Description: This file contains several JavaScript functions that are
**                   used by the Sample SCOs contained in the Sample Course.
**                   These functions encapsulate actions that are taken when the
**                   user navigates between SCOs, or exits the Lesson.
**
** Author: ADL Technical Team
**
** Contract Number:
** Company Name: CTC
**
** Design Issues:
**
** Implementation Issues:
** Known Problems:
** Side Effects:
**
** References: ADL SCORM
**
/******************************************************************************/
var startDate=null, exitPageStatus, formattedTime;

function loadPage() {
   var result=api.LMSInitialize('');
   var status=api.LMSGetValue("cmi.core.lesson_status");
   if(status=="not attempted") {
	  // the student is now attempting the lesson
	  api.LMSSetValue("cmi.core.lesson_status","incomplete");
   }
   startTimer();
   exitPageStatus=false;
}

function startTimer() { // chamada também nos popups
  startDate=new Date();
}

function computeTime() {
   if(startDate==null) formattedTime="00:00:00.0";
   else formattedTime=convertTotalSeconds(((new Date()).getTime()-startDate.getTime())/1000);
   api.LMSSetValue( "cmi.core.session_time", formattedTime);
}

function doBack() {
   api.LMSSetValue( "cmi.core.exit", "suspend" );
   computeTime();
   exitPageStatus=true;
   var result=api.LMSCommit('');
	// NOTE: LMSFinish will unload the current SCO.  All processing
	//       relative to the current page must be performed prior
	//		 to calling LMSFinish.
   result=api.LMSFinish('');
}

function doContinue( status ) {
   // Reinitialize Exit to blank
   api.LMSSetValue( "cmi.core.exit", "" );

   var mode=api.LMSGetValue("cmi.core.lesson_mode");
   if(mode != "review" && mode!="browse")
      api.LMSSetValue( "cmi.core.lesson_status", status );
   computeTime();
   exitPageStatus=true;

   var result=api.LMSCommit('');
	// NOTE: LMSFinish will unload the current SCO.  All processing
	//       relative to the current page must be performed prior
	//		 to calling LMSFinish.
   result=api.LMSFinish('');
}

function doQuit() {
  api.LMSSetValue( "cmi.core.exit", "suspend" );
  computeTime();
  exitPageStatus=true;

  var result=api.LMSCommit('');
	// NOTE: LMSFinish will unload the current SCO.  All processing
	//       relative to the current page must be performed prior
	//		 to calling LMSFinish.
  result=api.LMSFinish('');
}

/*******************************************************************************
** The purpose of this function is to handle cases where the current SCO may be
** unloaded via some user action other than using the navigation controls
** embedded in the content.   This function will be called every time an SCO
** is unloaded.  If the user has caused the page to be unloaded through the
** preferred SCO control mechanisms, the value of the "exitPageStatus" var
** will be true so we'll just allow the page to be unloaded.   If the value
** of "exitPageStatus" is false, we know the user caused to the page to be
** unloaded through use of some other mechanism... most likely the back
** button on the browser.  We'll handle this situation the same way we
** would handle a "quit" - as in the user pressing the SCO's quit button.
*******************************************************************************/
function unloadPage() {
	if(exitPageStatus!=true)
		doQuit();
	// NOTE:  don't return anything that resembles a javascript
	//		  string from this function or IE will take the
	//		  liberty of displaying a confirm message box.
}

/*******************************************************************************
** this function will convert seconds into hours, minutes, and seconds in
** CMITimespan type format - HHHH:MM:SS.SS (Hours has a max of 4 digits &
** Min of 2 digits
*******************************************************************************/
function convertTotalSeconds(ts) {
   var sec=(ts % 60);
   ts-=sec;
   var tmp=(ts % 3600);  //# of seconds in the total # of minutes
   ts-=tmp;              //# of seconds in the total # of hours
   // convert seconds to conform to CMITimespan type (e.g. SS.00)
   sec=Math.round(sec*100)/100;
   var strSec=new String(sec);
   var strWholeSec=strSec;
   var strFractionSec="";

   if(strSec.indexOf(".") != -1) {
      strWholeSec= strSec.substring(0, strSec.indexOf("."));
      strFractionSec=strSec.substring(strSec.indexOf(".")+1, strSec.length);
   }
   if(strWholeSec.length<2)
     strWholeSec="0"+strWholeSec;
   strSec=strWholeSec;
   if(strFractionSec.length)
     strSec=strSec+"."+strFractionSec;
   var hour=((ts%3600)!=0?0:ts/3600);
   var min=((tmp%60)!=0?0:tmp/60);

   if((new String(hour)).length<2)
      hour="0"+hour;
   if((new String(min)).length<2)
      min="0"+min;
   return hour+":"+min+":"+strSec;
}

function LMSStatusLesson(){
  var lessonStatus=api.LMSGetValue("cmi.core.lesson_status");
  var assessmentScore=api.LMSGetValue("cmi.core.score.raw");

  if(lessonStatus==""||lessonStatus!="passed")
    api.LMSSetValue("cmi.core.lesson_status",(assessmentScore>=70?"passed":"failed"));
}
