import { API } from "../config";

export const updateClient = async (clientId,updatedData)=>{
  try{
    const response = await fetch(`${API}/clients/${clientId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json()
    console.error("Error saving data on the server:");
    return{error:errorData}
  } else {
    console.log("Data saved successfully");
    return {success:true}
  }
} catch(error){
  return("error saving data:", error.message);
}}
