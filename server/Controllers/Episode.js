const Episode = require('../Models/Episode.js');
const Podcast = require('../Models/Podcasts.js')
const createError = require('http-errors')

const newEpisode = async (req, res, next) => {
    try {
        const { podcastId } = req.params;
        const { title, description, audioUrl } = req.body;

        const podcast = await Podcast.findById(podcastId);
        if (!podcast) throw createError[404]('Podcast not found');

        const newEpisode = new Episode({
            title: title,
            description: description,
            audioUrl: audioUrl
        });

        podcast.episodes.push(newEpisode);
        await podcast.save();

        const savedEpisode = await newEpisode.save();

        res.status(201).json({ message: 'Episode added successfully', episode: savedEpisode });

    } catch (error) {
        next(error)
    }
}


const getEpisodes = async(req,res,next) => {
    try {
        const episodes = await Episode.find();
        res.status(200).json(episodes);

    } catch (error) {
        next(error)
    }
}

const getUserPodcastEpisodes = async(req,res,next) => {
    try {
        const { podcastId } = req.params;
        const podcast = await Podcast.findById(podcastId);
        if (!podcast) throw createError[404]('Podcast not found');     
        
        res.status(201).json(podcast.episodes);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    newEpisode,
    getEpisodes,
    getUserPodcastEpisodes,
}