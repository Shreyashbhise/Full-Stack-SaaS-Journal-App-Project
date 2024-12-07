"use client";
import React, { useEffect, useState } from 'react'
import CollectionPreview from './collection-preview';
import CollectionForm from '@/components/collection-dialog';
import { createCollection } from '@/actions/collection';
import { toast } from 'sonner';
import useFetch from '@/hooks/use-fetch';
import { date } from 'zod';

const Collections = ({ collections = [], entriesByCollection }) => { 
    const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);

    const {
        loading: createCollectionLoading,
        fn: createCollectionFn,
        data: createdCollection,
    } = useFetch(createCollection); 

    useEffect(()=> { 
        if (createCollection) {
            setIsCollectionDialogOpen(false);
           
            
            toast.success(`Collection ${createCollection.name} created!`);
        }

    },[createdCollection]);

    const handleCreateCollection = async() => {
        createCollectionFn(date);
    }; 

    if (collections.length === 0) return <></>;

  return (
    <section id='collections' className='space-y-6'>
        <h2 className='text-3xl font-bold gradient-title'>Collections</h2>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <CollectionPreview 
            isCreateNew={true}
            onCreateNew={()=> setIsCollectionDialogOpen(true)}
            />
            {entriesByCollection?.unorganized?.length > 0 && (
                <CollectionPreview 
                name="Unorganized"
                entries={entriesByCollection.unorganized}
                isUnorganized={true}
                />
            )}
            {collections?.map((collection)=> (
                <CollectionPreview 
                key={collection.id}
                id={collection.id}
                name={collection.name}
                entries={entriesByCollection[collection.id] || []}
                />
            ))}
             <CollectionForm
            loading={createCollectionLoading}
            onSuccess={handleCreateCollection}
            open={isCollectionDialogOpen}
            setOpen={setIsCollectionDialogOpen}

            />
        </div>
    </section>
  )
}

export default Collections
