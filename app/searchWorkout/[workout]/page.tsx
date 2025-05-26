"use client"
import { fetchingWorkout } from '@/app/lib/workout'
import Load from '@/components/load'
import load from '@/components/load'
import { Exercise } from '@/types/allTypes'
import React, { useEffect, useState } from 'react'
import backBtn from '../../../components/backBtn';
import Link from 'next/link'
import BackBtn from '../../../components/backBtn'

export default function page({ params }: { params: { workout: string } }) {
  const [exerciseData, setWorkout] = useState<Exercise>()
  const [loading, setloading] = useState<boolean>(true)

  useEffect(() => {
    const fetchWorkout = async () => {
      let { workout } = await params
      let data = await fetchingWorkout(workout)
      setWorkout(data.results[0])
    }
    fetchWorkout()
    setloading(false)
  }, [])

  const [selectedGender, setSelectedGender] = useState("male");


  // Helper function to get images based on selected gender
  const getImages = () => {
    return selectedGender === "male" ? exerciseData?.male_images : exerciseData?.female_images;
  };

  // Helper function to get body map images based on selected gender
  const getBodyMapImages = () => {
    return exerciseData?.body_map_images.find(
      (img) => img.gender.id === (selectedGender === "male" ? 1 : 2)
    );
  };

  // Helper to get YouTube video based on gender
  const getYoutubeVideo = () => {
    return exerciseData?.long_form_content.find(
      (content) => content.gender.id === (selectedGender === "male" ? 1 : 2)
    );
  };

  if (loading) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <Load />
        </div>
      );
    }
  return (
    <div className='min-h-screen w-full p-2.5'>
      {/* Back Button */}
        <BackBtn />
      <div className="max-w-6xl my-[10px] rounded-2xl mx-auto p-4 bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{exerciseData?.name}</h1>

          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-blue-100 text-blue-800 font-medium rounded-full px-3 py-1 text-sm">
              {exerciseData?.category.name}
            </span>
            <span className="bg-green-100 text-green-800 font-medium rounded-full px-3 py-1 text-sm">
              {exerciseData?.difficulty.name}
            </span>
            <span className="bg-purple-100 text-purple-800 font-medium rounded-full px-3 py-1 text-sm">
              {exerciseData?.force.name}
            </span>
            <span className="bg-yellow-100 text-yellow-800 font-medium rounded-full px-3 py-1 text-sm">
              {exerciseData?.mechanic.name}
            </span>
            <span className="bg-gray-100 text-gray-800 font-medium rounded-full px-3 py-1 text-sm">
              Grip: {exerciseData?.grips[0].name}
            </span>
          </div>
          {exerciseData?.description && (
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: exerciseData.description }}
            />
          )}

          {exerciseData?.seo_tags && exerciseData?.seo_tags.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {exerciseData?.seo_tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Toggle for male/female */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${selectedGender === "male"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              onClick={() => setSelectedGender("male")}
            >
              Male
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${selectedGender === "female"
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              onClick={() => setSelectedGender("female")}
            >
              Female
            </button>
          </div>
        </div>

        {/* Demo Images/GIFs Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How To Perform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getImages()?.map((image, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <img
                  src={image.og_image}
                  alt={`${exerciseData?.name} view ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3 bg-gray-50">
                  <p className="text-gray-700 font-medium">
                    {index === 0 ? "Front View" : "Side View"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube Video */}
          {exerciseData?.use_youtube_links && getYoutubeVideo() && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Video Demonstration</h3>
              <div className="relative pb-9/16 h-[300px] overflow-hidden rounded-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getYoutubeVideo()?.youtube_link}
                  // src={"https://www.youtube.com/embed/tvRlfjjH5NA"}
                  title={`${exerciseData?.name} video demonstration`}
                  style={{ border: "0" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          )}
        </div>

        {/* Steps Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {exerciseData?.correct_steps.map((step) => (
              <li key={step.order} className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                  {step.order}
                </span>
                <span className="text-gray-700">{step.text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Muscle Information */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Muscles Worked</h2>

          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Primary Muscles</h3>
            <div className="space-y-3">
              {exerciseData?.muscles_primary.map((muscle) => (
                <div key={muscle.id} className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">{muscle.name}</h4>
                  {muscle.description && (
                    <p className="text-gray-700 mt-1">{muscle.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {(exerciseData?.muscles_secondary ?? []).length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Secondary Muscles</h3>
              <div className="space-y-3">
                {exerciseData?.muscles_secondary.map((muscle: any) => (
                  <div key={muscle.id} className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">{muscle.name}</h4>
                    {muscle.description && (
                      <p className="text-gray-700 mt-1">{muscle.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Body Map Images */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Muscle Activation Map</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg overflow-hidden">
              <img
                src={getBodyMapImages()?.front}
                alt="Front body muscle map"
                className="w-full h-auto"
              />
              <div className="p-3 bg-gray-50">
                <p className="text-gray-700 font-medium">Front View</p>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <img
                src={getBodyMapImages()?.back}
                alt="Back body muscle map"
                className="w-full h-auto"
              />
              <div className="p-3 bg-gray-50">
                <p className="text-gray-700 font-medium">Back View</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Technical Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-1">Force Type</h3>
              <p>{exerciseData?.force.name} - {exerciseData?.force.description}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-1">Mechanic Type</h3>
              <p>{exerciseData?.mechanic.name} - {exerciseData?.mechanic.description}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-1">Difficulty Level</h3>
              <p>{exerciseData?.difficulty.name}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-1">Equipment</h3>
              <p>{exerciseData?.category.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
