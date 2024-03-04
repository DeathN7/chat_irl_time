import Message from "../models/messages.model";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverID } = req.params;
        const senderID = req.user._id;

        let conversation =  await Conversation.findOne({
            participants: { $all: [senderID, receiverID] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderID, receiverID],
            })
        }

        const newMessage = new Message({
            senderID,
            receiverID,
            message,
        });

        if(newMessage){
            conversation.message.push(newMessage._id);
        }

        await Promise.all([newMessage.save(), conversation.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getMessages = async (req, res) => {
    try {
        const { id: userToChatID } = req.params;
        const senderID = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderID, userToChatID] },
        }).populate("message");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.message;
        
        res.status(200).json(conversation.message);
    } catch (error) {
        console.log("Error in sendMessage: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};