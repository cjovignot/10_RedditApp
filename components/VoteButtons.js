import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Text, IconButton } from 'react-native-paper';
import axios from 'axios';

const MyComponent = ({ subredditsData }) => {
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const upVote = () => {
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0Mzk3MjE4LCJpYXQiOjE2ODQzMTA4MTgsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LW9yQ2pUZUtOejk5VkpJT0w1NHY0OXhnRlJZeHBvZyIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.BnShEX1aOETDcKDskw01iDJkbvtHUYyFhnRwAfPuk7lFA1eTgVVBYVMUIJvzi6xk4Ma_V0BcUH-dtzpBhH1q9vl90QJS2mpzUjzESsMIc7-zmTTJe322JkHQWEo08FqRaHOxbd6pXnYq43dZsHjcEfvTsnKoHgxqvUSmdidmY4m6dcCR7PK--mBVBhWohIGnaOXWsFKWCKFs_pfU4OIpEmX8AW6od6q6Y0wWxEasrykIqt2hvxKhk2tVni77QMxSpQmet3lVcvFzl__CzXf1liXWJH-hAu14RGIZ6xAsSTmQtCETF0o5F32JrtE32f3WSmOgsOsbohfZTdFCWzSgJQ'; // Replace with your OAuth token
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
        // Handle successful vote response
          setUpVoted(true)
          console.log(response.data);
          console.log("upVote successfull", subredditsData.data.score +1);
        })
        .catch(error => {
          // Handle vote error
          console.error(error);
        });
    } else if (upVoted === true) {
      const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0Mzk3MjE4LCJpYXQiOjE2ODQzMTA4MTgsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LW9yQ2pUZUtOejk5VkpJT0w1NHY0OXhnRlJZeHBvZyIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.BnShEX1aOETDcKDskw01iDJkbvtHUYyFhnRwAfPuk7lFA1eTgVVBYVMUIJvzi6xk4Ma_V0BcUH-dtzpBhH1q9vl90QJS2mpzUjzESsMIc7-zmTTJe322JkHQWEo08FqRaHOxbd6pXnYq43dZsHjcEfvTsnKoHgxqvUSmdidmY4m6dcCR7PK--mBVBhWohIGnaOXWsFKWCKFs_pfU4OIpEmX8AW6od6q6Y0wWxEasrykIqt2hvxKhk2tVni77QMxSpQmet3lVcvFzl__CzXf1liXWJH-hAu14RGIZ6xAsSTmQtCETF0o5F32JrtE32f3WSmOgsOsbohfZTdFCWzSgJQ'; // Replace with your OAuth token
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
          // Handle successful vote response
          console.log(response.data);
          setUpVoted(false);
          console.log("Unvote successfull", subredditsData.data.score);
        })
        .catch(error => {
          // Handle vote error
          console.error(error);
        });
    }
  };

  const downVote = () => {
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0Mzk3MjE4LCJpYXQiOjE2ODQzMTA4MTgsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LW9yQ2pUZUtOejk5VkpJT0w1NHY0OXhnRlJZeHBvZyIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.BnShEX1aOETDcKDskw01iDJkbvtHUYyFhnRwAfPuk7lFA1eTgVVBYVMUIJvzi6xk4Ma_V0BcUH-dtzpBhH1q9vl90QJS2mpzUjzESsMIc7-zmTTJe322JkHQWEo08FqRaHOxbd6pXnYq43dZsHjcEfvTsnKoHgxqvUSmdidmY4m6dcCR7PK--mBVBhWohIGnaOXWsFKWCKFs_pfU4OIpEmX8AW6od6q6Y0wWxEasrykIqt2hvxKhk2tVni77QMxSpQmet3lVcvFzl__CzXf1liXWJH-hAu14RGIZ6xAsSTmQtCETF0o5F32JrtE32f3WSmOgsOsbohfZTdFCWzSgJQ'; // Replace with your OAuth token
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
          // Handle successful vote response
          console.log(response.data);
          setDownVoted(true)
          console.log("downVote successfull", subredditsData.data.score -1);
        })
        .catch(error => {
          // Handle vote error
          console.error(error);
        });
    } else if (downVoted === true) {
      const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0Mzk3MjE4LCJpYXQiOjE2ODQzMTA4MTgsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LW9yQ2pUZUtOejk5VkpJT0w1NHY0OXhnRlJZeHBvZyIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.BnShEX1aOETDcKDskw01iDJkbvtHUYyFhnRwAfPuk7lFA1eTgVVBYVMUIJvzi6xk4Ma_V0BcUH-dtzpBhH1q9vl90QJS2mpzUjzESsMIc7-zmTTJe322JkHQWEo08FqRaHOxbd6pXnYq43dZsHjcEfvTsnKoHgxqvUSmdidmY4m6dcCR7PK--mBVBhWohIGnaOXWsFKWCKFs_pfU4OIpEmX8AW6od6q6Y0wWxEasrykIqt2hvxKhk2tVni77QMxSpQmet3lVcvFzl__CzXf1liXWJH-hAu14RGIZ6xAsSTmQtCETF0o5F32JrtE32f3WSmOgsOsbohfZTdFCWzSgJQ'; // Replace with your OAuth token
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
          // Handle successful vote response
          setDownVoted(false);
          console.log(response.data);
          console.log("UnDownVote successfull", subredditsData.data.score);
        })
        .catch(error => {
          // Handle vote error
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