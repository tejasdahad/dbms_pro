import { firestore } from '../firebase/firebase';

export const clearState = () => async dispatch => {
    dispatch({
        type: 'CLEAR_STATE'
    });
}

export const finalUpdate = ({teacherData,studentData}) => async dispatch => {
    var i=0;
    console.log(teacherData);
    console.log(studentData);
    var batch = firestore.batch();
    var batch1 = firestore.batch();
    for(i=0;i<studentData.length;i++){
     var nycRef = firestore.collection("2020-21").doc("STUDENTS").collection("STUDENTS").doc(studentData[i].id);
     batch.set(nycRef, studentData[i]);
    }
    for(i=0;i<teacherData.length;i++){
        var nycRef1 = firestore.collection("2020-21").doc("TEACHERS").collection("TEACHERS").doc(teacherData[i].id);
        batch.update(nycRef1, {assigned: teacherData[i].assigned, noOfAssign: teacherData[i].noOfAssign});
    }
    batch.commit().then(function () {
        console.log("Batch executed");
        
    });
}

export const clearData = () => async dispatch => {
    const studentData = [];
    var count =0;

    firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => studentData.push({ ...doc.data(), id: doc.id }));
        console.log(studentData);

        var batch = firestore.batch();
        var batch1 = firestore.batch();
        var i=0;
        for(i=0;i<studentData.length;i++){
            var nycRef = firestore.collection("2020-21").doc("STUDENTS").collection("STUDENTS").doc(studentData[i].id);
            batch.update(nycRef, {assigned: false,teacherAssigned:""});
        }
// Set the value of 'NYC'
        

        // // Update the population of 'SF'
        // var sfRef = firestore.collection("2020-21").doc("TEACHERS").collection("TEACHERS").doc("teacher2");
        // batch.update(sfRef, {"noOfAssign": 1});

        // Commit the batch
        batch.commit().then(function () {
            console.log("Batch executed");
            var nycRef1 = firestore.collection("2020-21").doc("TEACHERS").collection("TEACHERS").doc("teacher1");
            batch1.update(nycRef1, {assigned:[],noOfAssign:0});
            var nycRef2 = firestore.collection("2020-21").doc("TEACHERS").collection("TEACHERS").doc("teacher2");
            batch1.update(nycRef2, {assigned:[],noOfAssign:0});
            batch1.commit().then(() => {
                console.log("Batch2 commited");
            })
        });
    });
    dispatch({
        type:'CLEAR_STATE'
    });
}

export const test = ({finalUpdate}) => async dispatch => {
    const teacherData = [];
    const studentData = [];
    var count =0;

    firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => studentData.push({ ...doc.data(), id: doc.id }));
    });
    firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => teacherData.push({ ...doc.data(), id: doc.id }));
        var remaining=[];
       studentData.map(s => {
            const filterTea = [];
            teacherData.map(as => {
                if(as.domain[0].name===s.domain && as.domain[0].sub === s.subDomain){
                    if(as.noOfAssign<6){
                        filterTea.push(as);
                    }
                    
                }
            });
            if(filterTea.length===0 && s.assigned===false){
                remaining.push(s);
                console.log(remaining)
            }
            if(filterTea.length>0){
                teacherData.map(as => {
                    if(as.id===filterTea[0].id){
                        as.assigned.push(s.id);
                        as.noOfAssign+=1;
                        s.assigned = true;
                        s.teacherAssigned = as.id;
                    }
                })
            }
       })
       if(remaining.length>0){
           remaining.map(s => {
                const filterTea = [];
                teacherData.map(as => {
                    var i=1;
                    for(i=1;i<as.domain.length;i++){
                        if(as.domain[i].name===s.domain && as.domain[i].sub === s.subDomain){
                            if(as.noOfAssign<6){
                                filterTea.push(as);
                                break;
                            }
                            
                        }
                    }
                });
                if(filterTea.length>0){
                    teacherData.map(as => {
                        if(as.id===filterTea[0].id){
                            as.assigned.push(s.id);
                            as.noOfAssign+=1;
                            s.assigned = true;
                            s.teacherAssigned = as.id;
                        }
                    })
                }
           });
       }
       //finalUpdate({teacherData,studentData});
    dispatch({
        type:'SET_ALLOCATED_DATA',
        payload: {
            finalStudentData: studentData,
            finalTeacherData: teacherData
        }
    });
    });
}

export const allocateStudent = () => async dispatch => {
    var finalStudentData = [];
    var finalTeacherData = [];
    const teacherData = [];
    const studentData = [];
    var count =0;

    firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => studentData.push({ ...doc.data(), id: doc.id }));
        console.log(studentData)
    });
    
    firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => teacherData.push({ ...doc.data(), id: doc.id }));
        console.log(teacherData);

        var remaining = [];
        studentData.map(s => {
            const filterTea = [];
            teacherData.map(as => {
                if(as.domain[0].name===s.domain && as.domain[0].sub === s.subDomain){
                    if(as.noOfAssign<6){
                        filterTea.push(as);
                    }
                    
                }
            });
            //console.log(filterTea);
            if(filterTea.length===0){
                remaining.push(s);
                console.log(remaining)
                // teacherData.map(as => {
                //     if(as.domain[1].name===s.domain && as.domain[1].sub === s.subDomain){
                //         if(as.noOfAssign<6){
                //             filterTea.push(as);
                //         }
                        
                //     }
                // });
            }
            console.log(filterTea);
            if(filterTea.length>0){
                console.log(s.id);
                filterTea[0].assigned.push(s.id);
                filterTea[0].noOfAssign+=1;
                s.assigned = true;
                s.teacherAssigned = filterTea[0].id;
                console.log(filterTea[0]);
                finalStudentData.push(s);
                finalTeacherData.push(filterTea[0]);
                console.log(finalStudentData);
                // firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').doc(s.id).set(s).then(d => {
                //     console.log("Updated student");
                //     count++;
                //     console.log(count);
                // });
                // console.log(filterTea[0]);
                // firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').doc(filterTea[0].id).set(filterTea[0]).then(d => (
                //     console.log("Updated teacher")
                // ));
            }
        })
        if(remaining.length>0){
            remaining.map(s => {
                const filterTea = [];
                teacherData.map(as => {
                    if(as.domain[1].name===s.domain && as.domain[1].sub === s.subDomain){
                        if(as.noOfAssign<6){
                            filterTea.push(as);
                        }
                        
                    }
                });
                console.log(filterTea);
            if(filterTea.length>0){
                console.log(s.id);
                // teacherData.map(t => {
                //     if(t.id === filterTea[0].id){
                //         t.assigned.push(s.id);
                //         t.noOfAssign+=1;
                //         s.assigned = true;
                //         s.teacherAssigned = t.id;
                //     }
                // })
                filterTea[0].assigned.push(s.id);
                filterTea[0].noOfAssign+=1;
                s.assigned = true;
                s.teacherAssigned = filterTea[0].id;
                console.log(filterTea[0]);
                finalStudentData.push(s);
                finalTeacherData.push(filterTea[0]);
                console.log(finalTeacherData);
                if(finalStudentData.length>=studentData.length){
                    
                    dispatch({
                        type:'SET_ALLOCATED_DATA',
                        payload: {
                            finalStudentData,
                            finalTeacherData
                        }
                    });
                    return;
                }
                // firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').doc(s.id).set(s).then(d => {
                //     console.log("Updated student");
                //      count++;
                //      console.log(count);
                //      if(count>=studentData.length){
                //          dispatch({
                //              type:'SET_FLAG'
                //          });
                //         return;
                         
                //      }
                // });
            }
            })
        }
        // var i;
        // for(i=0;i<teacherData.length;i++){
        //     if(teacherData[i].noOfAssign<6){
        //         const studentData = [];
        //         firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').onSnapshot((snapshot) => {
        //             snapshot.forEach((doc) => studentData.push({ ...doc.data(), id: doc.id }));
        //             console.log(studentData);
        //             const filterArray = studentData.filter(s => (s.domain === teacherData[i].domain[0].name && s.subDomain === teacherData[i].domain[0].sub  && !s.assigned));
        //             console.log(filterArray);
        //             if(filterArray.length > 0){
        //                 filterArray.map(a => {
        //                     if(teacherData[i].noOfAssign < 6){
        //                         teacherData[i].assigned.push(a.id);
        //                         teacherData[i].noOfAssign += 1;
        //                         a.teacherAssigned = teacherData[i].id;
        //                         a.assigned = true;
        //                     }
        //                 });
        //                 console.log(filterArray);
        //                 filterArray.map(a => {
        //                     firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').doc(a.id).set(a).then(d => (
        //                                 console.log("Updated student")
        //                             ));
        //                 });
        //                 firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').doc(teacherData[i].id).set(teacherData[i]).then(d => (
        //                     console.log("Updated teacher")
        //                     ));
        //             }
        //         });
        //     }
        // }
        // teacherData.map(as => {
        //     if(as.noOfAssign<6){
        //         const studentData = [];
        //         firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').onSnapshot((snapshot) => {
        //             snapshot.forEach((doc) => studentData.push({ ...doc.data(), id: doc.id }));
        //             console.log(studentData);
        //             const filterArray = studentData.filter(s => (s.domain === as.domain[0].name && s.subDomain === as.domain[0].sub  && !s.assigned));
        //             console.log(filterArray);
        //             if(filterArray.length > 0){
        //                 filterArray.map(a => {
        //                     if(as.noOfAssign < 6){
        //                         as.assigned.push(a.id);
        //                         as.noOfAssign += 1;
        //                         a.teacherAssigned = as.id;
        //                         a.assigned = true;
        //                     }
        //                 });
        //                 console.log(filterArray);
        //                 filterArray.map(a => {
        //                     firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').doc(a.id).set(a).then(d => (
        //                                 console.log("Updated student")
        //                             ));
        //                 });
        //                 firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').doc(as.id).set(as).then(d => (
        //                     console.log("Updated teacher")
        //                     ));
        //             }
        //         });
        //     }
            
        // });
        // const studentData1 = [];
        // firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').onSnapshot((snapshot) => {
        //     snapshot.forEach((doc) => studentData1.push({ ...doc.data(), id: doc.id }));
        //     // console.log(studentData1);
        //     const newStudentArray = studentData1.filter(a => (!a.assigned));
        //     console.log(newStudentArray);
        // });
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
    });

        
}

export const updateTeacher = () => async dispatch => {
    const studentData = [];
        firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').onSnapshot(async (snapshot) => {
            snapshot.forEach((doc) => studentData.push({ ...doc.data(), id: doc.id }));
            console.log(studentData);
            var i;
            for(i=0;i<studentData.length;i++){
                const de = await firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').doc(studentData[i].teacherAssigned).get();
                const data = de.data();
                console.log(data);
                data.noOfAssign+=1;
                data.assigned.push(studentData[i].id);
                await firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').doc(data.id).set(data);
            }
            dispatch({
                type: 'RESET_FLAG'
            })
        });

}