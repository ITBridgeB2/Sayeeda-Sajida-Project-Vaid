const RegisterService = async (patientData) => {
    console.log("Sending data to backend:", patientData);//Data is inbuilt method which retrives data

    const formattedData = {
     
            name: patientData.name,
            gender: patientData.gender,
            age: patientData.age,
            email: patientData.email,
            contact: patientData.contact,
            password: patientData.password,
            bpl: patientData.bpl,
            attenderName: patientData.attendername,
            attenderContact: patientData.attendercontact,
            relation: patientData.relation,
            diseaseName: patientData.diseaseName,
            otherDisease: patientData.otherDisease,
            duration: patientData.duration,
            diagonised: patientData.diagonised,
            testDone: patientData.testDone,
            altDisease: patientData.altdisease,
            suggestedHospitals:patientData.suggestedHospitals
        
    };

    const response = await fetch("http://localhost:9000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
    });

    return response.json();
};
export default RegisterService