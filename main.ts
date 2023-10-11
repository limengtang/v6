huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
huskylens.request()
Speech.Set_IICAddress(Speech.I2C_ADDR_Select.NEW_ADDR)
Speech.SetVolume(100)
Speech.SetSpell(Speech.Spell_Type.Spell_Enable)
Speech.SetStyle(Speech.Style_Type.Style_Continue)
Speech.SetReader(Speech.Reader_Type.Reader_XiaoYan)
basic.showLeds(`
    . . . . .
    . . . . .
    # # # # #
    . . . . .
    . . . . .
    `)
basic.showLeds(`
    . . . . .
    # # # # #
    . # # # .
    # # # # #
    . . . . .
    `)
basic.showLeds(`
    # # # # #
    . # # # .
    . # # # .
    . # # # .
    # # # # #
    `)
Speech.Speech_Text("kou3zhao4wei3shi0ti2xing3nin2")
Speech.Wait_XFS_Status(Speech.ChipStatus_Type.ChipStatus_Idle)
Speech.Speech_Text("fang2yi4qian1wan4tiao2 kou3zhao4di4yi1tiao2 ")
Speech.Wait_XFS_Status(Speech.ChipStatus_Type.ChipStatus_Idle)
Speech.Speech_Text("pei4dai4bu4gui1fan4 qin1ren2liang3hang2lei4")
Speech.Wait_XFS_Status(Speech.ChipStatus_Type.ChipStatus_Idle)
let algorithm_flag = 0
basic.forever(function () {
    if (algorithm_flag == 0) {
        basic.showIcon(IconNames.Chessboard)
        mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.OFF)
        huskylens.request()
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            huskylens.initMode(protocolAlgorithm.OBJECTCLASSIFICATION)
            huskylens.request()
            algorithm_flag = 1
        } else {
            basic.showLeds(`
                # . # . #
                . # . # .
                # . # . #
                . # . # .
                # . # . #
                `)
        }
    }
})
basic.forever(function () {
    if (algorithm_flag == 1) {
        huskylens.request()
        if (huskylens.readBox_s(Content3.ID) == 2) {
            mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.Cyan)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                # # # # #
                . # # # .
                `)
            Speech.Speech_Text("qing4gui1fan4pei4dai4kou3zhao4")
            Speech.Wait_XFS_Status(Speech.ChipStatus_Type.ChipStatus_Idle)
            huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
            huskylens.request()
            algorithm_flag = 0
        } else if (huskylens.readBox_s(Content3.ID) == 1) {
            mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.Red)
            basic.showLeds(`
                # # # # #
                . # # # .
                . # # # .
                . # # # .
                # # # # #
                `)
            Speech.Speech_Text("qing3pei4dai4kou3zhao4")
            mbit_小车类.CarCtrlSpeed2(mbit_小车类.CarState.Car_Run, 100, 100)
            basic.pause(200)
            mbit_小车类.CarCtrlSpeed2(mbit_小车类.CarState.Car_Back, 100, 100)
            basic.pause(300)
            mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_Stop)
            Speech.Wait_XFS_Status(Speech.ChipStatus_Type.ChipStatus_Idle)
            huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
            huskylens.request()
            algorithm_flag = 0
        } else if (huskylens.readBox_s(Content3.ID) == 3) {
            mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.Green)
            basic.showIcon(IconNames.Heart)
            Speech.Speech_Text("huan1ying2guang1lin2")
            mbit_小车类.CarCtrlSpeed2(mbit_小车类.CarState.Car_Back, 100, 100)
            basic.pause(100)
            mbit_小车类.CarCtrlSpeed2(mbit_小车类.CarState.Car_SpinRight, 100, 100)
            basic.pause(200)
            mbit_小车类.CarCtrlSpeed2(mbit_小车类.CarState.Car_SpinLeft, 100, 100)
            basic.pause(200)
            mbit_小车类.CarCtrl(mbit_小车类.CarState.Car_Stop)
            Speech.Wait_XFS_Status(Speech.ChipStatus_Type.ChipStatus_Idle)
            huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
            huskylens.request()
            algorithm_flag = 0
        } else {
            mbit_小车类.RGB_Car_Big2(mbit_小车类.enColor.OFF)
            huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
            huskylens.request()
            algorithm_flag = 0
        }
    }
})
