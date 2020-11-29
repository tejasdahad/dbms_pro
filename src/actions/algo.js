import { firestore } from '../firebase/firebase';

export const allocateStudent = () => async dispatch => {
    const teacherData = [];
    await firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => teacherData.push({ ...doc.data(), id: doc.id }));
        console.log(teacherData);
        teacherData.map(as => {
            const studentData = [];
            firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').onSnapshot((snapshot) => {
                snapshot.forEach((doc) => studentData.push({ ...doc.data(), id: doc.id }));
                console.log(studentData);
                const filterArray = studentData.filter(s => (s.domain === as.domain[0].name && s.subDomain === as.domain[0].sub  && !s.assigned));
                console.log(filterArray);
                if(filterArray.length > 0){
                    filterArray.map(a => {
                        if(as.noOfAssign < 6){
                            as.assigned.push(a.id);
                            as.noOfAssign += 1;
                            a.teacherAssigned = as.id;
                            a.assigned = true;
                        }
                    });
                    console.log(filterArray);
                    filterArray.map(a => {
                        firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').doc(a.id).set(a).then(d => (
                                    console.log("Updated student")
                                ));
                    });
                    firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').doc(as.id).set(as).then(d => (
                        console.log("Updated teacher")
                        ));
                }
            });
        });
        const studentData1 = [];
        firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').onSnapshot((snapshot) => {
            snapshot.forEach((doc) => studentData1.push({ ...doc.data(), id: doc.id }));
            // console.log(studentData1);
            const newStudentArray = studentData1.filter(a => (!a.assigned));
            console.log(newStudentArray);
        });
        // teacherData.map(as => {
        //     const filterArray = studentData.filter(s => (s.domain === as.domain[0].name && s.subDomain === as.domain[0].sub  && !s.assigned));
        //     console.log(filterArray);
        //     if(filterArray.length > 0){
        //         filterArray.map(a => {
        //             if(as.noOfAssign < 6){
        //                 as.assigned.push(a.id);
        //                 as.noOfAssign += 1;
        //             }
        //         })
        //     }
        // });
        // studentData.map(s => {
        //     const filterTea = [];
        //     teacherData.map(as => {
        //         if(as.domain[0].name===s.domain && as.domain[0].sub === s.subDomain){
        //             if(as.noOfAssign<6){
        //                 filterTea.push(as);
        //             }
                    
        //         }
        //     });
        //     console.log(filterTea);
        //     if(filterTea.length===0){
        //         teacherData.map(as => {
        //             if(as.domain[1].name===s.domain && as.domain[1].sub === s.subDomain){
        //                 if(as.noOfAssign<6){
        //                     filterTea.push(as);
        //                 }
                        
        //             }
        //         });
        //     }
        //     console.log(filterTea);
        //     if(filterTea.length>0){

        //         filterTea[0].assigned.push(s.id);
        //         filterTea[0].noOfAssign+=1;
        //         console.log(filterTea[0]);
        //         // firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').doc(filterTea[0].id).set(filterTea[0]).then(d => (
        //         //     console.log("Updated teacher")
        //         // ));
        //     }
        // })
    });
    
    
}