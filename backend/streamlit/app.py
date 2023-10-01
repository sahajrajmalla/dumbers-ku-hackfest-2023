import streamlit as st
import requests




def get_projects():
    url = "http://localhost:8000/projects/"  # Replace with the URL of your FastAPI backend
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return []


projects = get_projects()

for project in projects:
    st.write("Project Name:", project['project_name'])
    st.write("Project Type:", project['project_type'])
    st.write("Assessment Description:", project['assessment_description'])
    st.write("Area:", project['area'])
    st.write("---")
