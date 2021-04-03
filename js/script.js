var name = '';
var date = '';
var errorPod=false;
var check=false;
var show = false;
var errors = '';
var countPod=0;
var now = new Date();
var all = [];
var podzad=[];
var count = localStorage.length / 3;
if (!localStorage.getItem('all')) {
    localStorage.setItem('all', '[]');
}


window.onload = function () {
    var nowDate = '';
    nowDate = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay() + 'T' + now.getHours() + ':' + now.getMinutes();
    document.getElementById('date').value = nowDate;
    getAll();
    showAll();
// alert(all[0]);
}

function deleteElem(obj) {
    if (confirm('Хотите удалить задачу "' + all[obj.id][1] + '"?')) {
        getAll();
        all.splice(obj.id, 1);
        setAll();
        showAll();
    }
}

function editElem(obj) {
    //1-name 2-date


    getAll();

    showForm();
    document.getElementById('formHeader').textContent='Изменение задачи';
    document.getElementById('name').value = all[obj.id][1];
    document.getElementById('date').value = all[obj.id][2];
    document.getElementById('createButton').classList.add('hidden');
    var newElem = document.createElement("div");
    newElem.innerHTML='<button class="createNew createButton" id="'+obj.id+'" onclick="editElemReplace(this)">Изменить</button>';
    document.getElementById('createForm').insertBefore(newElem, null);
    if (all[obj.id][4]!==[]){
        document.getElementById('removePodzadacha').classList.remove('hidden');
        for(var i=0;i<all[obj.id][4].length;i++){
            var newDivPodzad=document.createElement('input');
            newDivPodzad.classList.add('createInput','podzadInput');
            newDivPodzad.id='podzad'+i;
            newDivPodzad.value=all[obj.id][4][i];

            document.getElementById('podzadachi').insertBefore(newDivPodzad,null);



        }

    }


}

function editElemReplace(obj) {
    errors = '';
    document.getElementById('name').classList.remove('area-invalid');

    document.getElementById('date').classList.remove('area-invalid');
    document.getElementById('errors').innerHTML = '';
    name = document.getElementById('name').value;
    date = new Date(document.getElementById('date').value);

    if (name === '') {
        document.getElementById('name').classList.add('area-invalid');
        if (errors === '') {
            errors = 'Задача не может быть пустой.';
        } else {
            errors = errors + '<br>Задача не может быть пустой.';
        }
    }
    if (date < now) {
        document.getElementById('date').classList.add('area-invalid');
        if (errors === '') {
            errors = 'Не ранее текущего времени.';
        } else {
            errors = errors + '<br>Не ранее текущего времени.';
        }
    } else {

        date = document.getElementById('date').value;
        // if (date===''){
        //     document.getElementById('date').classList.add('area-invalid');
        //     if (errors === '') {
        //         errors = 'Дата и время не может быть пустой.';
        //     } else {
        //         errors = errors + '<br>Дата и время не может быть пустой.';
        //     }
        // }

    }
    podzad=[];
    errorPod=false;
    for (var i=0;i<document.querySelectorAll('input.podzadInput').length;i++){

        if (document.getElementById('podzad'+i)){
        document.getElementById('podzad'+i).classList.remove('area-invalid');
        if (document.getElementById('podzad'+i).value===''){
            errorPod=true;
            document.getElementById('podzad'+i).classList.add('area-invalid');
        }
        else{
            podzad.push(document.getElementById('podzad'+i).value);
        }
    }
    }
    if (errorPod){
        if (errors === '') {
            errors = 'Подзадачи не могут быть пустыми.';
        } else {
            errors = errors + '<br>Подзадачи не могут быть пустыми.';
        }
    }

    if (errors === '') {
        newCount();
        getAll();
        all[obj.id][1]=name;
        all[obj.id][2]=date;
        all[obj.id][4]=podzad;
        setAll();
        showAll();
        showForm();
    }
    document.getElementById('errors').innerHTML = errors;
}

function setAll() {//сохранение в ls
    var json = JSON.stringify(all);
    localStorage.setItem('all', json);
}

function newCount() {//обновление счетчика
    count = JSON.parse(localStorage.getItem('all')).length;
}

function getAll() {//получение всех задач
    all = JSON.parse(localStorage.getItem('all'));
}

function splitDate(string, separator, i) {
    var arrStr = string.split(separator);
    return arrStr[i];
}

function removeAllPodzadacha() {
if (document.querySelectorAll('input.podzadInput').length!==0){
    while(document.getElementById(`podzadachi`).lastChild!==document.getElementById(`podzadachi`).firstChild){
        document.getElementById(`podzadachi`).lastChild.remove();
    }
    document.getElementById(`podzadachi`).lastChild.remove();
    document.getElementById(`createForm`).lastChild.remove();
    countPod=0;
}

}

function removePodzadacha() {
    if (document.getElementById(`podzadachi`).lastChild===document.getElementById(`podzadachi`).firstChild){
        document.getElementById(`podzadachi`).lastChild.remove();
        document.getElementById(`createForm`).lastChild.remove();
        countPod=0;
    }
    else{
        document.getElementById(`podzadachi`).lastChild.remove();
    }
}

function addPod() {
    countPod+=1;

    var newDivPodzad=document.createElement('input');
    newDivPodzad.classList.add('createInput','podzadInput');
    newDivPodzad.id='podzad'+countPod;


    document.getElementById('podzadachi').insertBefore(newDivPodzad,null);



}

function showAll() {
    var section = document.getElementById('section');
    var section2 = document.getElementById('section2');
    //1-name 2-date
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    while (section2.firstChild) {
        section2.removeChild(section2.firstChild);
    }
    newCount();
    for (var i = 0; i < count; i++) {
        var newDiv = document.createElement("div");
        var newPodDiv1 = document.createElement("div");
        var newPodDiv2 = document.createElement("div");
        var newPodDiv3 = document.createElement("div");
        var newPodDiv4 = document.createElement("div");
        newDiv.classList.add('elem');
        newPodDiv1.classList.add('name', 'podElem');

        newPodDiv2.classList.add('date', 'podElem');
        newPodDiv3.classList.add('actions', 'podElem');
        newPodDiv4.classList.add('podZad', 'podElem');
        if (all[i][4]!==[]){
            for (var l=0;l<all[i][4].length;l++){
                if (l===0){
                    var podzad=all[i][4][l];
                }
                else{
                    podzad=podzad+', '+all[i][4][l];
                }
            }
            newPodDiv4.innerHTML=podzad;
        }
        newPodDiv1.innerHTML = '<b>' + all[i][1] + '</b>';
        if (all[i][2] !== '') {
            newPodDiv2.innerHTML = checkDate(all[i][2]);
        }

        if (all[i][3]===true){
            newPodDiv1.classList.add('check');
            document.getElementById('section2'
            ).insertBefore(newDiv, null);
            newPodDiv3.innerHTML = '<button onclick="deleteElem(this)" class="actionBtn btnDelete btn-danger fa fa-trash-o" id="' + i + '"></button>';
            newDiv.insertBefore(newPodDiv1, null);

        }
        else{
            newPodDiv3.innerHTML = '<button onclick="checkElem(this)" class="actionBtn btn-success  fa  fa-flag-checkered" id="' + i + '"></button><button onclick="editElem(this)" class="actionBtn btnEdit btn-info fa  fa-edit" id="' + i + '"></button><button onclick="deleteElem(this)" class="actionBtn btnDelete btn-danger fa fa-trash-o" id="' + i + '">';
            document.getElementById('section'
            ).insertBefore(newDiv, null);
            newDiv.insertBefore(newPodDiv1, null);
            newDiv.insertBefore(newPodDiv2, null);
        }
        newDiv.insertBefore(newPodDiv4,null);
        newDiv.insertBefore(newPodDiv3, null);

    }
}
function checkDate(date) {
    var dateStr=date.split('T')[0]+' '+date.split('T')[1];
    var dateStamp=new Date(date);
    if (dateStamp < now) {
        dateStamp='Просрочено'
        return dateStamp;
    }
    else if (dateStamp.getDate()===now.getDate()&&dateStamp.getMonth()===now.getMonth()&&dateStamp.getFullYear()===now.getFullYear()){
        return 'Сегодня';
    }
    else if(dateStamp.getDate()-now.getDate()>=0&&dateStamp.getDate()-now.getDate()<2&&dateStamp.getMonth()===now.getMonth()&&dateStamp.getFullYear()===now.getFullYear()){

        return 'Завтра';
    }
    else if(dateStamp.getDate()-now.getDate()>=2&&dateStamp.getDate()-now.getDate()<3&&dateStamp.getMonth()===now.getMonth()&&dateStamp.getFullYear()===now.getFullYear()){
        // Math.floor((dateStamp.getTime()-now.getTime())/1000/60/60/24)>=2&&Math.floor((dateStamp.getTime()-now.getTime())/1000/60/60/24)<3
        return 'Послезавтра ';
    }
    else {
        // alert(dateStamp.getDate());
        var delta=dateStamp.getTime()-now.getTime();
        delta=Math.floor(delta/1000/60/60/24);
        var lastNum=delta.toString().substr(-1);
        var last2Num=delta.toString().substr(-2);
         if (lastNum==='0'||last2Num==='11'||last2Num==='12'||last2Num==='13'||last2Num==='14'||last2Num==='15'||last2Num==='16'||last2Num==='17'||last2Num==='18'||last2Num==='19'){
            return 'Через '+delta+' дней ('+dateStr+')';
        }
         else if(lastNum==='1'){
             return 'Через '+delta+' день ('+dateStr+')';
         }
         else if (lastNum==='2'||lastNum==='3'||lastNum==='4'){
             return 'Через '+delta+' дня ('+dateStr+')';
         }
        // if (delta.indexOf(''))
        return 'Через '+delta+' дней ('+dateStr+')';
    }

}

function showForm() {
    while (document.getElementById('podzadachi').firstChild){
        document.getElementById('podzadachi').firstChild.remove();
    }
    document.getElementById('removePodzadacha').classList.add('hidden');
    document.getElementById('createButton').classList.remove('hidden');
    if (document.getElementById('formHeader').textContent === 'Изменение задачи') {
        document.getElementById('createForm').lastChild.remove();
        document.getElementById('formHeader').textContent='Создание задачи';
    }

    if (!show) {
        document.getElementById('createForm').classList.remove('hidden');
        show = true;
    } else {
        document.getElementById('createForm').classList.add('hidden');
        show = false;
    }
}



function addNew() {
    errors = '';
    document.getElementById('name').classList.remove('area-invalid');

    document.getElementById('date').classList.remove('area-invalid');
    document.getElementById('errors').innerHTML = '';
    name = document.getElementById('name').value;
    date = new Date(document.getElementById('date').value);

    if (name === '') {
        document.getElementById('name').classList.add('area-invalid');
        if (errors === '') {
            errors = 'Задача не может быть пустой.';
        } else {
            errors = errors + '<br>Задача не может быть пустой.';
        }
    }
    if (date < now) {
        document.getElementById('date').classList.add('area-invalid');
        if (errors === '') {
            errors = 'Не ранее текущего времени.';
        } else {
            errors = errors + '<br>Не ранее текущего времени.';
        }
    } else {

        date = document.getElementById('date').value;
        // if (date===''){
        //     document.getElementById('date').classList.add('area-invalid');
        //     if (errors === '') {
        //         errors = 'Дата и время не может быть пустой.';
        //     } else {
        //         errors = errors + '<br>Дата и время не может быть пустой.';
        //     }
        // }

    }
    podzad=[];
    errorPod=false;
    for (var i=0;i<document.querySelectorAll('input.podzadInput').length;i++){
        var k=i+1;
        document.getElementById('podzad'+k).classList.remove('area-invalid');
        if (document.getElementById('podzad'+k).value===''){
            errorPod=true;
            document.getElementById('podzad'+k).classList.add('area-invalid');
        }
        else{
            podzad.push(document.getElementById('podzad'+k).value);
        }
    }
    if (errorPod){
        if (errors === '') {
            errors = 'Подзадачи не могут быть пустыми.';
        } else {
            errors = errors + '<br>Подзадачи не могут быть пустыми.';
        }
    }

    if (errors === '') {
        newCount();

        var elem = [
            count,
            name,
            date,
            check,
            podzad,
        ];
        count = count + 1;
        all.push(elem);
        setAll();
        showAll()
        // localStorage.setItem('name'+count, name);
        // localStorage.setItem('date'+count, date);
        // localStorage.setItem('time'+count, time);
        showForm();
        removeAllPodzadacha();
    }
    document.getElementById('errors').innerHTML = errors;
}

function showCategory(obj) {
    if (obj.id==='1'){
        document.getElementById('section2').classList.remove('hidden');
        document.getElementById('section').classList.add('hidden');
    }
    else if (obj.id==='0'){
        document.getElementById('section2').classList.add('hidden');
        document.getElementById('section').classList.remove('hidden');
    }
}
function checkElem(obj) {
    if (all[obj.id][3]===false){
        all[obj.id][3]=true;
    }
    else if (all[obj.id][3]===true){
        all[obj.id][3]=false;
    }
    setAll();
    getAll();
    showAll();
}