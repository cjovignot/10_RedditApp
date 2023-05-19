import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import axios from 'axios';

const MyComponent = ({ subredditsData }) => {
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const upVote = () => {
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NDk0NzE3LCJpYXQiOjE2ODQ0MDgzMTcsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LVBjRm5mR0ZGa0dFd1Y5S0ZxMHZ5Q2RhRVc4eTZ2USIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.4dUyoj3zJOQ1YNStigFLeuFg5vyDarjjCClVMNcmhe2c36OWkNXc3cqtu8FRZs-jJnhkYgpOAN4V-B1fJ6Gr8kHVz41XDVe431K_QjlpT8r38ngQJ-nDvw1DkISAa_fKHDsiixwEHxOiaPaPnCL-Ly5Wz-83ZqhgLPsbLq0Jc_SVXkuIP-EBx3P2OqhDEFAS7I-ayLNV4KaKbib2xuHyfIht10DeJeCl4zNiM4O1abyzwALnEUP5AbiW4jACRcqbnFGvNh_UoIC4wuapWSptMxdTUJE4b6g3TKqVfJ5a9z8Lw4AOfTZ-8Iqrs7E8cJMv5TJExF1gQyGwUFdShaYxEg';
    const id=subredditsData.data.name
    const dir=1

    const options = {
      method: 'POST',
      url: 'https://oauth.reddit.com/api/vote',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
      },
      data: `id=${id}&dir=${dir}`,
    };
  
    if (upVoted === false) {
      axios.request(options)
      .then(response => {
          setUpVoted(true)
          console.log(response.data);
          console.log("upVote successfull", subredditsData.data.score +1);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (upVoted === true) {
      const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NDk0NzE3LCJpYXQiOjE2ODQ0MDgzMTcsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LVBjRm5mR0ZGa0dFd1Y5S0ZxMHZ5Q2RhRVc4eTZ2USIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.4dUyoj3zJOQ1YNStigFLeuFg5vyDarjjCClVMNcmhe2c36OWkNXc3cqtu8FRZs-jJnhkYgpOAN4V-B1fJ6Gr8kHVz41XDVe431K_QjlpT8r38ngQJ-nDvw1DkISAa_fKHDsiixwEHxOiaPaPnCL-Ly5Wz-83ZqhgLPsbLq0Jc_SVXkuIP-EBx3P2OqhDEFAS7I-ayLNV4KaKbib2xuHyfIht10DeJeCl4zNiM4O1abyzwALnEUP5AbiW4jACRcqbnFGvNh_UoIC4wuapWSptMxdTUJE4b6g3TKqVfJ5a9z8Lw4AOfTZ-8Iqrs7E8cJMv5TJExF1gQyGwUFdShaYxEg';
      const id=subredditsData.data.name
      const dir=0
  
      const options = {
        method: 'POST',
        url: 'https://oauth.reddit.com/api/vote',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
        },
        data: `id=${id}&dir=${dir}`,
      };

      axios.request(options)
        .then(response => {
          console.log(response.data);
          setUpVoted(false);
          console.log("Unvote successfull", subredditsData.data.score);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const downVote = () => {
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NDk0NzE3LCJpYXQiOjE2ODQ0MDgzMTcsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LVBjRm5mR0ZGa0dFd1Y5S0ZxMHZ5Q2RhRVc4eTZ2USIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.4dUyoj3zJOQ1YNStigFLeuFg5vyDarjjCClVMNcmhe2c36OWkNXc3cqtu8FRZs-jJnhkYgpOAN4V-B1fJ6Gr8kHVz41XDVe431K_QjlpT8r38ngQJ-nDvw1DkISAa_fKHDsiixwEHxOiaPaPnCL-Ly5Wz-83ZqhgLPsbLq0Jc_SVXkuIP-EBx3P2OqhDEFAS7I-ayLNV4KaKbib2xuHyfIht10DeJeCl4zNiM4O1abyzwALnEUP5AbiW4jACRcqbnFGvNh_UoIC4wuapWSptMxdTUJE4b6g3TKqVfJ5a9z8Lw4AOfTZ-8Iqrs7E8cJMv5TJExF1gQyGwUFdShaYxEg';
    const id=subredditsData.data.name
    const dir=-1

    const options = {
      method: 'POST',
      url: 'https://oauth.reddit.com/api/vote',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
      },
      data: `id=${id}&dir=${dir}`,
    };
  
    if (downVoted === false) {
      axios.request(options)
        .then(response => {
          console.log(response.data);
          setDownVoted(true)
          console.log("downVote successfull", subredditsData.data.score -1);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (downVoted === true) {
      const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NDk0NzE3LCJpYXQiOjE2ODQ0MDgzMTcsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LVBjRm5mR0ZGa0dFd1Y5S0ZxMHZ5Q2RhRVc4eTZ2USIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.4dUyoj3zJOQ1YNStigFLeuFg5vyDarjjCClVMNcmhe2c36OWkNXc3cqtu8FRZs-jJnhkYgpOAN4V-B1fJ6Gr8kHVz41XDVe431K_QjlpT8r38ngQJ-nDvw1DkISAa_fKHDsiixwEHxOiaPaPnCL-Ly5Wz-83ZqhgLPsbLq0Jc_SVXkuIP-EBx3P2OqhDEFAS7I-ayLNV4KaKbib2xuHyfIht10DeJeCl4zNiM4O1abyzwALnEUP5AbiW4jACRcqbnFGvNh_UoIC4wuapWSptMxdTUJE4b6g3TKqVfJ5a9z8Lw4AOfTZ-8Iqrs7E8cJMv5TJExF1gQyGwUFdShaYxEg';
      const id=subredditsData.data.name
      const dir=0
  
      const options = {
        method: 'POST',
        url: 'https://oauth.reddit.com/api/vote',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
        },
        data: `id=${id}&dir=${dir}`,
      };

      axios.request(options)
        .then(response => {
          setDownVoted(false);
          console.log(response.data);
          console.log("UnDownVote successfull", subredditsData.data.score);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <Card.Actions>

        {upVoted === true &&
          <IconButton
            icon="chevron-double-down"
            size={20}
          />
        }
        {upVoted === false &&
          <IconButton
            icon="chevron-double-down"
            size={20}
            onPress={() => downVote()}
          />
        }

        {upVoted === false && downVoted === false &&
          <Text variant="titleSmall">{subredditsData.data.score}</Text>
        }

        {upVoted === true && downVoted === false &&
          <Text variant="titleSmall">{subredditsData.data.score + 1}</Text>
        }
        
        {downVoted === true && upVoted === false &&
          <Text variant="titleSmall">{subredditsData.data.score - 1}</Text>
        }


        {downVoted === true &&
          <IconButton
            mode='outlined'
            icon="chevron-double-up"
            size={20}
          />
        }
        {downVoted === false &&
          <IconButton
            icon="chevron-double-up"
            size={20}
            onPress={() => upVote()}
          />
        }

    </Card.Actions>
  )
};

const styles = StyleSheet.create({
});

export default MyComponent;