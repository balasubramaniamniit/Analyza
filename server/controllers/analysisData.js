import { getDashBoardData, getDashBoardDataList, getUserHistoryForAnalysisData } from './cassandra.js';


export const getDataToCompare = async (req, res) => {
    const { conversationId1, conversationId2 } = req.params;
    await getDashBoardData({ handlerId: req.userId }, { conversationIdData: { $elemMatch: { conversationId: conversationId1 } } }).then(async (response1) => {
        if (err) {
            console.log(err)
        }
        else {
            await getDashBoardData({ handlerId: req.userId }, { conversationIdData: { $elemMatch: { conversationId: conversationId2 } } }).then((response2) => {
                if (err) {
                    console.log(err)
                }
                else {
                    let data = {
                        performance1: response1,
                        performance2: response2
                    }
                    res.status(200).json(data)
                }
            })
        }
    })
}


export const getConversationList = async (req, res) => {
    let response = await getDashBoardDataList(req.userId)
    response = JSON.parse(decodeURIComponent(response))
    const documentId = Object.keys(response.data)[0]

    if (response == null) {
        res.status(204).json({ message: "Please upload a video to generate analysis data!" })
    }
    else {
        // console.log(response)
        console.log(response.data[documentId])
        res.status(200).json({ conversationIdData: response.data[documentId] })

    }
}

export const fetchAnanlysisData = async (req, res) => {
    await getDashBoardData({ handlerId: req.userId }, { conversationIdData: { $elemMatch: { conversationId: req.params.conversationId } } }).then(async (response) => {
        if (err) {
            console.log(err)
            res.status(204).json({ message: "Please upload a video to generate analysis data!" })
        }
        else {
            console.log(response.conversationIdData[0].analysisData, "in fetch ggggg")
            res.status(200).json({ analysisData: response.conversationIdData[0].analysisData })
        }
    })
}