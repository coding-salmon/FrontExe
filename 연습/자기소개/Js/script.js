function showContent(sectionId){
    //모든 섹션을 숨김
    document.querySelectorAll('main section').forEach(section =>{
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display='block';
}
document.querySelectorAll('main section').forEach(section =>{
    section.addEventListener()
    var contents=document.querySelectorAll('.content');
    for (var i=0; i<contents.length;i++){
        contents[i].computedStyleMap.display = 'none';
    }    

document.getElementById(sectionId).style.display="block";
}