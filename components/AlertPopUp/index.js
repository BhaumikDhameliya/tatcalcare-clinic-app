import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dialog, Portal, Button } from 'react-native-paper';
import { Apptheme } from '../../config/Colors';
import { Rtext } from '../Rtext';







const AlertPopUp = ({ dialogStatus = false, setDialogStatus = () => { }, deleteFunc = () => { }, backDoctorListPage_Func = () => {}, title = "Do you want to delete", style,cancelColor=Apptheme,doneColor='#c2786b'}) => {
    return (

        <Portal>
            <Dialog visible={dialogStatus} style={style}>
                <Dialog.Content>
                    <Rtext>{title}</Rtext>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        uppercase={false}
                        // color={Apptheme}
                        textColor={cancelColor}
                        style={{ fontWeight: 'bold', fontSize: 16 }}
                        onPress={() => {
                            backDoctorListPage_Func();
                            setDialogStatus(false);
                        }}
                    >
                        No
                    </Button>
                    <Button
                        uppercase={false}
                        // color={Apptheme}
                        textColor={doneColor}
                        style={{ fontWeight: 'bold', fontSize: 16 }}
                        onPress={deleteFunc}

                    >
                        Yes
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>

    )
}
export default AlertPopUp;