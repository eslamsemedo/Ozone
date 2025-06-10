'use client'
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowBigUp, ImageIcon, Loader2, XIcon } from "lucide-react";
import createPostAction from "@/action/createPostAction";
import { useRef, useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from 'next-cloudinary'
import toast from "react-hot-toast";

export interface PostFormData {
  textInput: string;
  image: string;
}


export default function PostForm() {
  const { user } = useUser()
  const ref = useRef<HTMLFormElement>(null)
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [text, setText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePostAction = async (formData: PostFormData): Promise<void> => {
    const formDataCopy = formData;
    // ref.current?.reset();

    const text = formDataCopy.textInput;

    if (!text) {
      // throw new Error("You must provide a post input");
      toast.error("You must provide a post input")
      return
    }

    setImgUrl(null);
    setText(null);

    try {
      setLoading(true)
      await createPostAction(formDataCopy);
    } catch (error) {
      console.error(`Error creating post: ${error}`);
      toast.error("Error creating post")
      // Display toast
    } finally {
      setLoading(false)
    }
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  return (
    <div className="mb-2">
      {loading && (
        <div className="flex fixed top-0 right-0 bottom-0 left-0 justify-center items-center bg-black/50">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <form
        className="p-3 bg-[#eeeeee] rounded-lg border"
        ref={ref}
        // action={(formData) => {
        //   handlePostAction(formData);
        // }}
        onSubmit={(e) => {
          e.preventDefault();
          handlePostAction({ textInput: text || "", image: imgUrl || "" });
        }}
      >
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="postInput"
            placeholder="Start writing a post..."
            className="flex-1 px-4 py-3 rounded-full border outline-none"
            onChange={(e) => setText(e.target.value)}
            value={text || ""}
          />


          <Button className="h-10 rounded-xl bg-slate-500" type="submit">
            <ArrowBigUp />
          </Button>
        </div>

        {/* preview */}

        {imgUrl && (
          <div className="mt-2">
            <Image src={imgUrl} alt="Preview"
              width={500}
              height={500}
              className="object-cover w-full" />
          </div>
        )}

        <div className="flex justify-end mt-2">
          <CldUploadWidget
            uploadPreset="moshNext"
            options={{
              // multiple: false,
              maxFileSize: 2000000, // 2MB
              // cropping: true,
              sources: ["local", "camera"],
              styles: {
                palette: {
                  window: "#07253E",
                  windowBorder: "#90A0B3",
                  tabIcon: "#0078FF",
                  menuIcons: "#5A616A",
                  textDark: "#000000",
                  textLight: "#FFFFFF",
                  link: "#0078FF",
                  action: "#FF620C",
                  inactiveTabIcon: "#245DA7",
                  error: "#F44235",
                  inProgress: "#0078FF",
                  complete: "#20B832",
                  sourceBg: "#000000"
                },
                fonts: {
                  default: {
                    active: true
                  }
                }
              }
            }}
            onSuccess={(result) => {
              const url =
                typeof result.info === "object" && result.info && "url" in result.info
                  ? (result.info.url as string)
                  : ""
                  setImgUrl(url)
            }}
          >
            {({ open }) => {
              return (
                <Button
                  type="button"
                  onClick={() => open()}
                  variant={imgUrl ? "secondary" : "outline"}
                  className="cursor-pointer hover:bg-slate-500 hover:text-white transition-colors duration-300"
                >
                  <ImageIcon className="mr-2" size={16} color="currentColor" />
                  {imgUrl ? "change" : "add"} image
                </Button>
              )
            }}
          </CldUploadWidget>


          {imgUrl && (
            <Button
              type="button"
              onClick={() => setImgUrl(null)}
              variant="outline"
              className="ml-2 cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-300"
            >
              <XIcon className="mr-2" size={16} color="currentColor" />
              remove
            </Button>
          )}
        </div>

      </form>
      {/* <hr className="mt-2 border-gray-300" /> */}
    </div>
  )
}
