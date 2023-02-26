const decorationDict = {
    1: "unicornDecorator",
    2: "easyADecorator",
    3: "grapeDecorator",
    4: "skyDecorator",
    5: "sageDecorator",
    6: "busDecorator",
    7: "pumpkinSpiceDecorator"
  };
  
  export function checkInsertion(tag) {
    return tag !== -1;
  }


  export function onlyUnique(value, index, arr) {
    return arr.indexOf(value) === index;
  }

  export function findTagRange(tag, arr) {
    var range = []
    var currRange = []
    var adding = false;
    for (var i = 0; i < arr.length; i++) {
      if (adding === true && arr[i] !== tag) {
        adding = false;
        range.push(currRange);
        currRange = [];
      } 
      if (arr[i] === tag) {
        if (range.length === 0) {
          adding = true
        }
        currRange.push(i);
      }
    }
    if (currRange.length !== 0) {
      range.push(currRange);
    }
    console.log(range);
    return range;
  }

  
  export function getRanges(history) {
    var currTags = history.slice(-1)[0].tags;
    var insertionTags = currTags.filter(checkInsertion);
    var unique = insertionTags.filter(onlyUnique);
    var ranges = []
    for (var i = 0; i < unique.length; i++) {
      var r = findTagRange(unique[i], currTags);
      for (var j = 0; j < r.length; j++) {
        var start = r[j][0];
        var end = r[j][r[j].length - 1];
        ranges.push([start, end]);
      }    
    }
    return ranges; 
  }

  export function displayTags(history, editor, monaco, displaySetter, decorationSetter) {
    var ranges = getRanges(history);
    var dList = [];
    var currTags = history.slice(-1)[0].tags;
    for (var i = 0; i < ranges.length; i++) {
      var decId = (i + 1)%7;
      const start = ranges[i][0];
      const end = ranges[i][1];
      console.log(currTags[start]);
      dList.push({
        range: new monaco.Range(start + 1,1,end + 1,1),
        options: {
          isWholeLine: true,
          className: decorationDict[decId],
          hoverMessage: {value: currTags[start]}
        }
      });
    }
    editor.updateOptions({readOnly: true});
    var d = editor.deltaDecorations([], dList);
    decorationSetter(d);
    displaySetter(d);
       
  }

  export function endTagView(editor, decorationRef, decorationSetter, displaySetter) {

    editor.deltaDecorations(decorationRef, []);
    editor.updateOptions({readOnly: false});
    displaySetter(false);
    decorationSetter([]);
  }

  export function toggleDisplay(history, displayRef, editor, decorationRef, decorationSetter, displaySetter, monaco) {
    console.log(monaco);
    if (displayRef) {
      endTagView(editor, decorationRef, decorationSetter, displaySetter);

    } else {
      displayTags(history, editor, monaco, displaySetter, decorationSetter);
    }
  }