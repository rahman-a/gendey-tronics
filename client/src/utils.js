export const tm = (se,lang) => {
    let h = (se /60 /60)
    if(h < 1){
       let  t = lang === 'ar' 
       ?  Math.ceil((h * 100).toFixed(2)) + ' دقيقة' 
       : Math.ceil((h * 100).toFixed(2)) +' minutes'
        return t 
    }
    if(h === 1) return lang === 'ar' ? 'ساعة واحدة' :'one hour'
    return lang === 'ar' 
    ? Math.ceil(h.toFixed(2))  +  ' ساعة' 
    : Math.ceil(h.toFixed(2))  + ' hours'
}