  function init(){
  document.addEventListener('DOMContentLoaded',function(){
  const tab2= document.getElementById('tab2');
  const tab3= document.getElementById('tab3');
  const tab1= document.getElementById('tab1');
    document.querySelector('.profile').classList.add('Red');
    tab2.style.display='none';
    tab3.style.display='none';
  });
  saveProfile();
  

  }
  function tabChanger(e){
    const tab2= document.getElementById('tab2');
    const tab3= document.getElementById('tab3');
    const tab1= document.getElementById('tab1');
    const profile=document.querySelector('.profile');
    const analysis=document.querySelector('.analysis');
    const professional=document.querySelector('.professional');
    profile.classList.remove('Red');
    analysis.classList.remove('Red');
    professional.classList.remove('Red');
    if(e==='Analysis-insights'){
      tab1.style.display='none';
      tab3.style.display='none';
      tab2.style.display='block';
      analysis.classList.add('Red');

    }
    else if(e==='professionalConsultation'){
      tab1.style.display='none';
      tab2.style.display='none';
      tab3.style.display='block';
      professional.classList.add('Red');

    }
    else{
      tab1.style.display='block';
      tab2.style.display='none';
      tab3.style.display='none';
      profile.classList.add('Red');


    }
  }
  function saveProfile(){
  document.querySelector('.saveProfile').addEventListener('click' ,function(){
      const Mark10=document.querySelector('.Mark10').value.trim();
      const Mark11=document.querySelector('.Mark11').value.trim();
      const Mark12=document.querySelector('.Mark12').value.trim();
      const Budget=document.getElementById('Budget').value.trim();
      const education=document.getElementById('education').value.trim();
      const Locations=document.querySelector('.Locat').value.trim();
      const Course=document.querySelector('.Course').value.trim();
      const Institution=document.querySelector('.Institution').value.trim();
      if (!Mark10 || !Mark11 || !Mark12 || !Budget || !education || !Locations || !Course || !Institution){
         alert("Fill all the Boxes");
         return;
       }
    const profileData={
      Mark10,
      Mark11,
      Mark12,
      Budget,
      education,
      Locations,
      Course,
      Institution
     }
      console.log(profileData);
    
    const Successfully=document.querySelector('.Successfully');
    Successfully.classList.add('Success');
    Successfully.textContent='Successfully Saved';
  });
}

function insight(){
      document.querySelector('.output-box').style.display='block';
      const Mark10=document.querySelector('.Mark10').value.trim();
      const Mark11=document.querySelector('.Mark11').value.trim();
      const Mark12=document.querySelector('.Mark12').value.trim();
      const Budget=document.getElementById('Budget').value.trim();
      const education=document.getElementById('education').value.trim();
      const Locations=document.querySelector('.Locat').value.trim();
      const Course=document.querySelector('.Course').value.trim();
      const Institution=document.querySelector('.Institution').value.trim();
      if (!Mark10 || !Mark11 || !Mark12 || !Budget || !education || !Locations || !Course || !Institution){
         alert("Save Your Profile");
         return;
       }
    const profileData={
      Mark10,
      Mark11,
      Mark12,
      Budget,
      education,
      Locations,
      Course,
      Institution
     }
      console.log(profileData);
    
    const Successfully=document.querySelector('.Successfully');
    Successfully.classList.add('Success');
    Successfully.textContent='Successfully Saved';
    InsightGemini(profileData);
  
}
async function InsightGemini(profileData){
    console.log('loading..');
    const apiKey="AIzaSyC3L5OaYMhK6bYzpiqrJwrdmBSIwe4KccU";
    const Api= `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    document.querySelector('.AiContents').innerHTML = "<p style='color: white; width:300px; height:20px; font-size:small;'>Generating insights... Please wait.</p>";
    
      const prompt=`Suggest the best universities and career options for a student with:
    - Class 10 Marks: ${profileData.Mark10}
    - Class 11 Marks: ${profileData.Mark11}
    - Class 12 Marks: ${profileData.Mark12}
    - Budget: ${profileData.Budget}
    - College co-education: ${profileData.education}
    - Preferred Location: ${profileData.Locations}
    - Interested Course: ${profileData.Course}
    - Preferred College: ${profileData.Institution}`;
    try {
      const response = await fetch(Api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await response.json();
      const insights = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No insights available";
      document.querySelector('.AiContents').textContent = insights;
  } catch (error) {
      console.error("Error fetching AI insights:", error);
  }
  document.querySelector('.ChatwithGemini').addEventListener('click', async function () {
    const AskGemini = document.querySelector('.AskGemini').value.trim();

    if (!AskGemini) {
        alert("Please enter a question before chatting with Gemini.");
        return;
    }

    
    const profileData = {
        Mark10: document.querySelector('.Mark10').value.trim(),
        Mark11: document.querySelector('.Mark11').value.trim(),
        Mark12: document.querySelector('.Mark12').value.trim(),
        Budget: document.getElementById('Budget').value.trim(),
        education: document.getElementById('education').value.trim(),
        Locations: document.querySelector('.Locat').value.trim(),
        Course: document.querySelector('.Course').value.trim(),
        Institution: document.querySelector('.Institution').value.trim()
    };

    
    if (!profileData.Mark10 || !profileData.Mark11 || !profileData.Mark12 || !profileData.Budget || 
        !profileData.education || !profileData.Locations || !profileData.Course || !profileData.Institution) {
        alert("Please fill out your profile before chatting with Gemini.");
        return;
    }

    console.log('loading..');
    const apiKey = "AIzaSyC3L5OaYMhK6bYzpiqrJwrdmBSIwe4KccU";
    const Api = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    document.querySelector('.GeminiContent').innerHTML = "<p style='color: white; font-size:small;'>Generating... Please wait.</p>";

    const prompt = `Student Profile Details:
  - Class 10 Marks: ${profileData.Mark10}
  - Class 11 Marks: ${profileData.Mark11}
  - Class 12 Marks: ${profileData.Mark12}
  - Budget: ${profileData.Budget}
  - College Type: ${profileData.education}
  - Preferred Location: ${profileData.Locations}
  - Interested Course: ${profileData.Course}
  - Preferred College: ${profileData.Institution}

  Based on the above details, answer this question:
  ${AskGemini}`;

    try {
        const response = await fetch(Api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        const insights = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No insights available";

        const chatBox = document.querySelector('.GeminiContent');
        chatBox.innerHTML += `<p style="color: white; font-size:small;">💬 ${AskGemini}</p>`;
        chatBox.innerHTML += `<p style="color: lightblue; font-size:small;">🤖 ${insights}</p>`;
    } catch (error) {
        console.error("Error fetching AI insights:", error);
    }
});

}
document.querySelector('.CallwithGemini').addEventListener('click', async () => {
  const PhoneNumber = document.querySelector('.PhoneNumber').value.trim();
  
  if (!PhoneNumber) {
      alert("Please enter a phone number.");
      return;
  }

  // Fetch the latest profile data
  const profileData = {
      Mark10: document.querySelector('.Mark10').value.trim(),
      Mark11: document.querySelector('.Mark11').value.trim(),
      Mark12: document.querySelector('.Mark12').value.trim(),
      Budget: document.getElementById('Budget').value.trim(),
      education: document.getElementById('education').value.trim(),
      Locations: document.querySelector('.Locat').value.trim(),
      Course: document.querySelector('.Course').value.trim(),
      Institution: document.querySelector('.Institution').value.trim()
  };

  
  if (!profileData.Mark10 || !profileData.Mark11 || !profileData.Mark12 || !profileData.Budget || 
      !profileData.education || !profileData.Locations || !profileData.Course || !profileData.Institution) {
      alert("Please fill out your profile before making a call.");
      return;
  }

  const headers = {
      'Authorization': 'org_07663d17024b4a5e8f6e1f4b07682c88f35f687ed4353c08832aaefc7896b114aa1c11e2cca026d0921e69', 
      'Content-Type': 'application/json'
  };
    const data = {
    phone_number: `+91${PhoneNumber}`,
    task: `Provide career guidance based on student profile.`,
    voice: "nat",
    wait_for_greeting: false,
    record: true,
    amd: false,
    answered_by_enabled: false,
    noise_cancellation: false,
    interruption_threshold: 100,
    block_interruptions: false,
    max_duration: 12,
    model: "base",
    language: "en",
    background_track: "none",
    voicemail_action: "hangup"
};


  try {
      console.log("Calling with Gemini...");
      const response = await axios.post('https://api.bland.ai/v1/calls', data, { headers });
      console.log("Call initiated:", response.data);
      alert("Call initiated successfully! AI will provide career guidance.");
  } catch (error) {
      console.error("Error making call:", error.response?.data || error.message);
      alert("Failed to initiate call. Check the console for details.");
  }
});






  init();
