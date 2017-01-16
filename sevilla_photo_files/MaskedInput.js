//<script language="javascript">
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//--	name:		MaskDate
	//--	created:	9/20/2000	Joseph Hucik
	//--	purpose:	Allows only characters specified within function as valid key strokes.  All other values
	//--					will not be permitted.
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MaskDate()
	{
		var strCheck = "0123456789/-.";
			
		if (strCheck.indexOf(String.fromCharCode(window.event.keyCode))==-1) {
			window.event.returnValue = false;
			return;
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//--	name:		MaskMoney
	//--	created:	9/20/2000	Joseph Hucik
	//--	purpose:	Allows only characters specified within function as valid key strokes.  All other values
	//--					will not be permitted.
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MaskMoney()
	{
		var strCheck = "0123456789.$(),-";
			
		if (strCheck.indexOf(String.fromCharCode(window.event.keyCode))==-1) {
			window.event.returnValue = false;
			return;
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//--	name:		MaskNumbers
	//--	created:	9/21/2000	Joseph Hucik
	//--	purpose:	Allows only numbers for an input field
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MaskNumbers()
	{
		var strCheck = "0123456789";
			
		if (strCheck.indexOf(String.fromCharCode(window.event.keyCode))==-1) {
			window.event.returnValue = false;
			return;
		}
	}
	
	function MaskFloat()
	{
		var strCheck = "0123456789.";
			
		if (strCheck.indexOf(String.fromCharCode(window.event.keyCode))==-1) {
			window.event.returnValue = false;
			return;
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//--	name:		MaskPhone
	//--	created:	9/20/2000	Joseph Hucik
	//--	purpose:	Allows only characters specified within function as valid key strokes.  All other values
	//--					will not be permitted.
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MaskPhone()
	{
		var strCheck = "0123456789/-.#() ";
			
		if (strCheck.indexOf(String.fromCharCode(window.event.keyCode))==-1) {
			window.event.returnValue = false;
			return;
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//--	name:		MaskSSN
	//--	created:	9/25/2000	Joseph Hucik
	//--	purpose:	Allows only characters used for a SSN as valid keystrokes.
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MaskSSN()
	{
		var strCheck = "0123456789-.";
		
		if (strCheck.indexOf(String.fromCharCode(window.event.keyCode))==-1) {
			window.event.returnValue = false;
			return;
		}
	}
	
	function MaskTime()
	{
		var sMask = "0123456789: ampmAMPM";
		
		if (sMask.indexOf(String.fromCharCode(event.keyCode)) == -1) {
			event.returnValue = false;
			
			return;
		}
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//--	name:		MaskZipCode
	//--	created:	9/20/2000	Joseph Hucik
	//--	purpose:	Allows only characters specified within function as valid key strokes.  All other values
	//--					will not be permitted.
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function MaskZipCode()
	{
		var strCheck = "0123456789-.";
			
		if (strCheck.indexOf(String.fromCharCode(window.event.keyCode))==-1) {
			window.event.returnValue = false;
			return;
		}
	}