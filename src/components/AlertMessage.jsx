import React from "react";
import { Alert } from "@mui/material";

const AlertMessage = ({alertMessage}) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      let timer;
      if(alertMessage && alertMessage.length === 2){

        setVisible(true);

        timer = setTimeout(() => {
          setVisible(false);
        }, 3000);
      }


      return () => {if (timer){clearTimeout(timer)}} 
    }, [alertMessage]);

    if(alertMessage && alertMessage.length === 2){
        return (
            <div className={`alert-container ${visible ? "slide-in" : "slide-out"}`}>
              {visible && <Alert severity={alertMessage[0]}>{alertMessage[1]}</Alert>}
            </div>
          );
    }

  };


  export default AlertMessage;