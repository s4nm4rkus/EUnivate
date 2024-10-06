import React from 'react'

const SidebarMessage = () => {
  const [invitedMembers, setInvitedMembers] = useState([]); 

 
  useEffect(() => {
    const fetchInvitedMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/invited-members');
        setInvitedMembers(response.data); 
      } catch (error) {
        console.error('Error fetching invited members:', error);
      }
    };

    fetchInvitedMembers();
  }, []);

  return (
    <div>SidebarMessage</div>
  )
}

export default SidebarMessage