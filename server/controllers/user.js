import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { addUser, checkUserExisting, getDocument } from './cassandra.js';

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        let existingUser = await checkUserExisting(req.body.email)
        existingUser = JSON.parse(existingUser)
        if (Object.keys(existingUser.data).length > 0) {
            console.log("Sssss")
            res.status(400).json({ message: "User already exist!" });
        }
        else {
            if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match! " });
            const hashedPassword = await bcrypt.hash(password, 12);
            const result = await addUser({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
            let document = await getDocument(result.documentId)
            document = JSON.parse(document)
            let decodedEmail = decodeURIComponent(document.data.email)
            let decodedName = decodeURIComponent(document.data.name)
            let decodedPassword = decodeURIComponent(document.data.password)
            document.data.email = decodedEmail
            let finalData = {
                name: decodedName,
                email: decodedEmail,
                password: decodedPassword,
                _id: result.documentId,
                joinedOn: new Date(document.data.joinedOn).toISOString()
            }
            const token = jwt.sign({ email: finalData.email, id: finalData._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ finalData, token });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" })
    }

}

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let existingUser = await checkUserExisting(req.body.email)
        existingUser = JSON.parse(existingUser)
        console.log(existingUser, "this is iesdsa")
        console.log(Object.keys(existingUser.data).length)
        if (Object.keys(existingUser.data).length == 0) {
            return res.status(404).json({ message: "User doesn't exist!" });
        }
        // let document = await getDocument(ex.documentId)
        console.log(Object.keys(existingUser.data)[0], "rrrrrrrr")
        const documentId = Object.keys(existingUser.data)[0]
        let decodedEmail = decodeURIComponent(existingUser.data[documentId].email)
        let decodedName = decodeURIComponent(existingUser.data[documentId].name)
        let decodedPassword = decodeURIComponent(existingUser.data[documentId].password)
        const isPasswordCorrect = await bcrypt.compare(password, decodedPassword);
        let finalData = {
            name: decodedName,
            email: decodedEmail,
            password: decodedPassword,
            _id: documentId,
            joinedOn: new Date(existingUser.data[documentId].joinedOn).toISOString()
        }
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials." });
        const token = jwt.sign({ email: decodedEmail, id: documentId }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ result: finalData, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" })
    }
}