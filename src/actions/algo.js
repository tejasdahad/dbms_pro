import { firestore } from '../firebase/firebase';

export const allocateStudent = () => async dispatch => {
    const studentData = [];
    await firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => studentData.push({ ...doc.data(), id: doc.id }));
        console.log(studentData);
    });
    const teacherData = [];
    await firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => teacherData.push({ ...doc.data(), id: doc.id }));
        console.log(teacherData);
        studentData.map(s => {
            const filterTea = [];
            teacherData.map(as => {
                if(as.domain[0].name===s.domain && as.domain[0].sub === s.subDomain){
                    if(as.noOfAssign<6){
                        filterTea.push(as);
                    }
                    
                }
            });
            console.log(filterTea);
            if(filterTea.length===0){
                teacherData.map(as => {
                    if(as.domain[1].name===s.domain && as.domain[1].sub === s.subDomain){
                        if(as.noOfAssign<6){
                            filterTea.push(as);
                        }
                        
                    }
                });
            }
            console.log(filterTea);
            if(filterTea.length>0){

                filterTea[0].assigned.push(s.id);
                filterTea[0].noOfAssign+=1;
                console.log(filterTea[0]);
                // firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').doc(filterTea[0].id).set(filterTea[0]).then(d => (
                //     console.log("Updated teacher")
                // ));
            }
        })
    });
    
    
}