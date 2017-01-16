//<script language="javascript">	
	function DisableControl(oControl, bDisable)
	{
		with (oControl) {
			disabled = (bDisable) ? true : false;
			style.cursor = (bDisable) ? "default" : "";
			
			if ((tagName == "INPUT" && type == "text") || tagName == "TEXTAREA" || tagName == "SELECT") {
				style.backgroundColor = (bDisable) ? "#EEEEEE" : "";
			}
		
		}
	}
	function DisableLabel(oLabel, bDisable)
	{
		oLabel.style.color = (bDisable) ? "#777777" : "";
	}
	function Format(oElement, szType)
	{
		switch (szType.toLowerCase()) {
			case "date":
				oElement.value = FormatDate(oElement.value);
				break;
			
			case "float":
				oElement.value = ParseChar(oElement.value, GetParseChars("float"));
				break;
				
			case "money":
				oElement.value = FormatMoney(oElement.value);
				break;
			
			case "number":
				oElement.value = FormatNumber(oElement.value);
				break;
			
			case "phone":
				oElement.value = FormatPhone(oElement.value);
				break;
			
			case "ssn":
				oElement.value = FormatSSN(oElement.value);
				break;
			
			case "time":
				oElement.value = FormatTime(oElement.value);
				break;
				
			case "zipcode":
				oElement.value = FormatZipCode(oElement.value);
				break;		
		}
	}
	function FormatDate(sDate)
	{
		var bValid = true;
		var vReturnValue;
		
		if (sDate.length != 0) {
			var oDate = new Date(sDate);
			
			if (isNaN(oDate)) bValid = false;
			
		} else {
			bValid = false;
		}
		
		if (bValid) {
			var dd = oDate.getDate().toString();
			var mm = (oDate.getMonth() + 1).toString();
			var yy = sDate.substr(sDate.lastIndexOf("/") + 1, sDate.length);
			var yyyy = oDate.getFullYear().toString();
			
			mm = (mm.length==1) ? "0" + mm : mm;
			dd = (dd.length==1) ? "0" + dd : dd;
			yy = (yy.length==1) ? "0" + yy : yy;
			
			if (yy.length == 2) {
				
				yyyy = (yy < 51) ? "20" + yy : "19" + yy;
			}
			
			yyyy = (yyyy < 1900) ? 1900 : yyyy;
			yyyy = (yyyy > 2050) ? 2050 : yyyy;
			
			vReturnValue = mm + "/" + dd + "/" + yyyy;
			
		} else {
			vReturnValue = "";
		}
		
		return vReturnValue;
	}
	
	//--------------------------------------------------------------------------
	//  Function:	FormatTime
	//  Descr:		This function will format an input string in the
	//					following format:  ##:## *m.
	//
	//  Inputs:		String to format
	//  Output:		Formatted string
	//---------------------------------------------------------------------------
	function FormatTime(szInput)
	{
		var bFormat = true;
		var sFormat;
		var oTime;
				
		//--Remove any invalid characters
		//szInput = ParseChar(szInput, GetParseChars("time"));
		
		if (szInput.length != 0) {
			
			//--only one number was entered, so add a "0" before it
			if (szInput.length == 1) szInput = "0" + szInput;
			
			//--User entered a number between 0 and 9 with a "p" or "a", so add the "m"
			if (szInput.length == 2 && (szInput.indexOf("a") != -1 || szInput.indexOf("p") != -1) ) szInput += "m";
			
			//--Only numbers were entered, so add colon to end of string
			if (szInput.length == 2 && szInput.indexOf(":") == -1) szInput += ":";
			
			//--There is one number and either an "am" or "pm", so add a colon after the number
			if (szInput.length == 3 && (szInput.indexOf("am") != -1 || szInput.indexOf("pm") != -1)) szInput = szInput.substr(0, 1) + ":" + szInput.substr(1, 3);
			
			//--Determine if input was a valid Time
			oTime = new Date(szInput);	//--Date/Time object based off the input
			
			if (isNaN(oTime)) {
			
				//--Add generic Date to input string (only the Time was provided)
				szInput = "1/1/1900 " + szInput;
				oTime = new Date(szInput);
				
				//--Verify the Time object is a number
				if (isNaN(oTime)) bFormat = false;
			}
		} else {
			
			bFormat = false;	//--input was empty string
		}
		
		//--Format the input string if it is a valid Time
		if (bFormat) {
			
			//--Determine hours, minutes, and "am" or "pm"
			var hh = oTime.getHours().toString();
			var mn = oTime.getMinutes().toString();
			var ampm = (hh < 12) ? "am" : "pm";
			
			//--Display the hours in numbers between 1 and 12
			if (hh > 11) hh -= 12;		//--After 12 noon
			if (hh == 0) hh = 12;		//--12 am
			
			//--Add a "0" to the minutes if they are between 0 and 9
			if (mn.length != 2) mn = "0" + mn;
			
			sFormat = hh + ":" + mn + ampm;
			
		} else {
			sFormat = "";
		}
		
		return sFormat;
	}
	//--------------------------------------------------------------------------
	function FormatPercent(inputVal)
	{
		var vReturnValue = "";
		var bValid = true;
		if (isNaN(parseFloat(inputVal))) bValid = false;
		if (inputVal.length == 0) bValid = false;
		
		if (bValid) {
			vReturnValue = ((Math.round(parseFloat(inputVal) * 100)) / 100).toString();
			return vReturnValue + "%";
		}
		else
		{
			return vReturnValue;
		}
		
	}
	//--------------------------------------------------------------------------
	function FormatMoney(sMoney)
	{
		var bValid = true;
		var bNegative = (sMoney.indexOf("-") != -1 || sMoney.indexOf("(") != -1) ? true : false;
		var sParsed = ParseChar(sMoney, GetParseChars("money"));
		var vReturnValue;
	
		if (isNaN(parseFloat(sParsed))) bValid = false;
		if (sParsed.length == 0) bValid = false;
		
		if (bValid) {
			vReturnValue = ((Math.round(parseFloat(sParsed) * 100)) / 100).toString();
			
			if (vReturnValue.indexOf(".") == -1) vReturnValue = vReturnValue + ".00";
			if (vReturnValue.indexOf(".") == (vReturnValue.length - 1)) vReturnValue = vReturnValue + "00";
			if (vReturnValue.indexOf(".") == (vReturnValue.length - 2)) vReturnValue = vReturnValue + "0";
			
			if (vReturnValue.indexOf(".") > 3)
			{
				var dollars = vReturnValue.substring(0, vReturnValue.indexOf("."));
				var cents = vReturnValue.substring(vReturnValue.indexOf(".") + 1);
				var bucks = "";
							
				while (dollars.length > 3) {
					bucks =  "," + dollars.substring(dollars.length-3) + bucks;
					dollars = dollars.substring(0, dollars.length-3);
				}
							
				vReturnValue = dollars + bucks + "." + cents;
			}
			vReturnValue = "$" + vReturnValue;
				
			if (bNegative) vReturnValue = "-" + vReturnValue;
			
		} else {
			vReturnValue = "";
		}
		
		return vReturnValue;
	}
	function FormatNumber(sCurrentValue)
	{
		var sParsed = "";
		var sReturnNumber = "";
		var sValidChars = "0123456789";
		
		for (var i=0; i < sCurrentValue.length; i++) {
			
			var j = i + 1;
			
			sParsed = sCurrentValue.substring(i, j).toString();
			
			if (sValidChars.indexOf(sParsed) != -1) {
				sReturnNumber = sReturnNumber + sParsed.toString();
			}
		}
						
		return sReturnNumber;
	}
	function FormatPhone(sPhoneNumber)
	{
		var bValid = true;
		var sParsed = ParseChar(sPhoneNumber, GetParseChars("phone"));
		var vReturnValue;
		
		if (isNaN(parseInt(sParsed))) bValid = false;
		if (sParsed.length > 10 && sParsed.substring(0, 1) == 1) sParsed = sParsed.slice(1);
		
		vReturnValue = (bValid) ? sParsed.substring(0,3) + "-" + sParsed.substring(3,6) + "-" + sParsed.substring(6,10) : "";
		
		return vReturnValue;
	}
	function FormatSSN(sSSN)
	{
		var bValid = true;
		var sParsed = ParseChar(sSSN, GetParseChars("ssn"));
		var vReturnValue;
	
		if (isNaN(parseInt(sParsed))) bValid = false;
	
		vReturnValue = (bValid) ? sParsed.substring(0, 3) + "-" + sParsed.substring(3, 5) + "-" + sParsed.substring(5, 9) : "";
		
		return vReturnValue;
	}
	function FormatZipCode(sZipCode)
	{
		var bValid = true;
		var sParsed = ParseChar(sZipCode, GetParseChars("zipcode"));
		var vReturnValue;
		
		if (isNaN(parseInt(sParsed))) bValid = false;
		if (sParsed.length < 5) bValid = false;
		
		if (bValid) {
			vReturnValue = (sParsed.length < 9) ? sParsed.substring(0, 5) : sParsed.substring(0, 5) + "-" + sParsed.substring(5, 9);
		} else {
			vReturnValue = "";
		}
		
		return vReturnValue;
	}
	function GetParseChars(sParseType)
	{
		var aParseChars;
		
		switch (sParseType) {
			case "float":
				aParseChars = new Array("%", ",", " ");
				break;
			case "money":
				aParseChars = new Array("$", " ", ",", "(", ")", "-");
				break;
			case "percent":
				aParseChars = new Array("%", " ", ",", "(", ")", "-");
				break;
			case "phone":
				aParseChars = new Array("(", ")", ".", "-", " ");
				break;
			case "ssn":
				aParseChars = new Array("-", ".", " ");
				break;
			case "time":
				aParseChars = new Array(" ");
				break;
			case "zipcode":
				aParseChars = new Array("-", ".", " ");
				break;
		}
		
		return aParseChars;
	}
	function LimitText(oControl, nMaxLength)
	{
		nMaxLength = parseInt(nMaxLength);
		
		if (oControl.value.length > nMaxLength) {
			oControl.value = oControl.value.substring(0, nMaxLength);
		}
	}
	function LimitMessage(maxlength, message, counter)
	{
		var remaining;
		
		//if the current message exceeds the max-length then trim the chars in the msg field
		if ( (message.value.length) > maxlength)
		{
			message.value = message.value.substring(0, maxlength);
		}
		else	//otherwise update the value of the available characters counter field
		{
			remaining = maxlength - (message.value.length);
			if (counter != null) counter.innerHTML = "<b>" + remaining + "</b> characters remaining";
		}
	}
	function LockControl(oControl, bLock)
	{
		with (oControl) {
			readOnly = (bLock) ? true : false;
			style.backgroundColor = (bLock) ? "#EEEEEE" : "";
			style.cursor = (bLock) ? "default" : "";
		}
	}
	function ParseChar(myString, parseArray)
	{
	    for (var i=0; i < parseArray.length; i++) {
	        var parsedString = "";
	        var beginAt = 0;
	        var endAt = myString.indexOf(parseArray[i]);
		
	        while (endAt != -1) {
	            parsedString += myString.substring(beginAt, endAt);
	            beginAt = endAt + 1;
	            endAt = myString.indexOf(parseArray[i], beginAt);
	        }
	        parsedString += myString.substring(myString.lastIndexOf(parseArray[i]) + 1, myString.length);
			        
	        myString = parsedString;
	    }
			    
	    return parsedString;
	}
	function RemoveFormatting(oElement, sType)
	{
		oElement.value = ParseChar(oElement.value, GetParseChars(sType));
		oElement.select();
	}
	
	//Returns the number of intervals between two dates
	//interaval: Required. String expression to calculate the differences between date1 and date2. 
	//value are: 's' for second, 'n' for minute, 'h' for hour, 'd' for day
	//date1 and date2: Required. Date object. 
	
	function DateDiff(interval, date1, date2) {
	
	//get current year, month, day, Ms
	var Date1Ms = date1.getTime();
	var Date2Ms = date2.getTime();
	
	if(interval=='d'){
		return (Date1Ms-Date2Ms)/(1000 * 60 * 60 * 24)
		}
	else if(interval=='h'){
		return (Date1Ms-Date2Ms)/(1000 * 60 * 60)
		}
	else if(interval=='n'){
		return (Date1Ms-Date2Ms)/(1000 * 60)
		}			
	else if(interval=='s'){
		return (Date1Ms-Date2Ms)/(1000)			
		}
	}
	
	function LTrim(strIn)
	{  
		var index = 0;
		while (strIn.charAt(index)==" " ||strIn.charCodeAt(index)==13 ||strIn.charCodeAt(index)==10) index++;
		
		return strIn.substring (index, strIn.length);
	}
		
	function RTrim(strIn)
	{
		var index = strIn.length-1;
		while (strIn.charAt(index)==" " ||strIn.charCodeAt(index)==13 ||strIn.charCodeAt(index)==10) index--;
		
		return strIn.substring (0,index+1);
	}		