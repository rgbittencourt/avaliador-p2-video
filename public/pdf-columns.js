(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.P2PdfColumns=api;
})(typeof window!=='undefined'?window:globalThis,function(){
  function textOf(row){
    return (row?.items||[]).map(item=>String(item.text||'')).join(' ').replace(/\s+/g,' ').trim();
  }

  function columnStarts(pages){
    for(const rows of pages||[]){
      for(const row of rows||[]){
        const items=row.items||[];
        const voz=items.find(i=>/^Voz$/i.test(String(i.text||'').trim()));
        const imagens=items.find(i=>/^Imagens?$/i.test(String(i.text||'').trim()));
        const outros=items.find(i=>/^Outros\s*\/\s*OBS$/i.test(String(i.text||'').trim()));
        if(voz&&imagens&&outros){
          return {voz:Number(voz.x)-8,imagens:Number(imagens.x)-8,outros:Number(outros.x)-8,fim:Math.max(560,Number(outros.x)+180)};
        }
      }
    }
    return {voz:130,imagens:314,outros:400,fim:560};
  }

  function collect(pages,startRe,endRe){
    const starts=columnStarts(pages);
    let active=false;
    const voice=[],images=[],notes=[];
    for(const rows of pages||[]){
      for(const row of rows||[]){
        const line=textOf(row);
        const label=(row.items||[]).filter(item=>Number(item.x)<starts.voz).map(item=>String(item.text||'')).join(' ').replace(/\s+/g,' ').trim();
        if(startRe.test(label))active=true;
        else if(active&&endRe&&endRe.test(label))active=false;
        if(!active)continue;
        if(/^(Voz|Imagens?|Outros\s*\/\s*OBS)$/i.test(line)||/Especializa[cç][aã]o|Instituto Federal|Rua:\s*14|Fone:|CNPJ/i.test(line))continue;
        for(const item of row.items||[]){
          const value=String(item.text||'').trim();
          const x=Number(item.x);
          if(!value||!Number.isFinite(x))continue;
          if(x>=starts.voz&&x<starts.imagens)voice.push(value);
          else if(x>=starts.imagens&&x<starts.outros)images.push(value);
          else if(x>=starts.outros&&x<starts.fim)notes.push(value);
        }
      }
    }
    return {voice,images,notes,starts};
  }

  return {columnStarts,collect};
});
