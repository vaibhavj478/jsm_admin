import React, { useState } from 'react';
import { Chip, IconButton, Paper, Typography, Box, Badge } from '@mui/material';
import { AddCircleOutline, Delete, Edit } from '@mui/icons-material';






const RecursiveChipList = ({ categories, onEdit, onDelete, onAdd }) => {

    return (
        <Box style={{ borderLeft: "1px solid blue", maxWidth: '400px', }}>
            {categories.map(category => (
                <div key={category._id} style={{ marginLeft: `${category.level * 20}px`, marginBottom: '10px' }}>

                    <Badge badgeContent={category.children.length} color="secondary">
                        <Chip  label={category.name} />
                    </Badge>


                    <IconButton onClick={() => onEdit(category , category._id )} color="primary">
                        <Edit />
                    </IconButton>

                    <IconButton onClick={() => onDelete(category)} color="error">
                        <Delete />
                    </IconButton>

                    {   category.children.length > 0 && (
                        <RecursiveChipList
                            categories={category.children}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onAdd={onAdd}
                        />
                    )}
                </div>
            ))}
        </Box>
    );
};



export default RecursiveChipList