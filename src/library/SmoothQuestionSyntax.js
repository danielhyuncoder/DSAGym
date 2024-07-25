const cMap={
    "g": "green",
    "p": "purple",
    "r": "red",
    "y": "yellow",
    "b": "black",
    "w": "white",
    "s": "rgba(53, 53, 53, 0.548)"
  }
  const compile = (text) => {
      let sp = text.split('\n')
      let clean = [];
      let l =0;
      while (l<sp.length){
         let st = sp[l];
         let checkColorTag=st.indexOf("%o");
         let checkBoxTag=st.indexOf("%b");
         if (checkColorTag!=-1){
            let le = l+1;
            let color = st[checkColorTag+2];
            let bold = st[checkColorTag+3];
            let fullSt=st;
            while (le<sp.length&&sp[le].indexOf('%co')===-1){
                 fullSt+="\n" + sp[le];
                 le++;
            }
            if (sp[le].indexOf('%co')===-1){
                return [{type: "mt", color: 'red', bold:true, content: "Syntax error."}];
            }
            fullSt=fullSt.split(" ").filter(item=>item.indexOf('%co')===-1&&item.indexOf('%o')===-1).join(" ");
            clean.push({type: "mt",color: cMap[color], bold:bold==='b'?true:false, content: fullSt});
            l=le;
         } else if (checkBoxTag!==-1){
            let le = l+1;
            let color = st[checkColorTag+3];
            let bold = st[checkColorTag+4];
            let bgColor=st[checkColorTag+5];
            let fullSt=st;
            while (le<sp.length&&sp[le].indexOf('%cb')===-1){
                 fullSt+="\n" + sp[le];
                 le++;
            }
            if (sp[le].indexOf('%cb')===-1){
                return [{type: "mt", color: 'red', bold:true, content: "Syntax error."}];
               break;
            }
            fullSt=fullSt.split(" ").filter(item=>item.indexOf('%cb')===-1&&item.indexOf('%b')===-1).join(" ");
            clean.push({type: "bn",color: cMap[color], bold:bold==='b'?true:false, content: fullSt, backgroundColor: cMap[bgColor]});
            l=le;
         } else {
            clean.push({type: "nt", content:st});
         }
         l++;
      }
      return clean;
  }
export default compile;